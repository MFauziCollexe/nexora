const fs = require("fs");
const path = require("path");

const base = path.resolve("c:/xampp/htdocs/Nexora/nexora-web");
const files = [
  "app/(dashboard)/master-data/(business_partner)/vendor/page.tsx",
  "app/(dashboard)/master-data/(inventory)/item-master/page.tsx",
  "app/(dashboard)/master-data/(inventory)/category/page.tsx",
  "app/(dashboard)/master-data/(inventory)/brand/page.tsx",
  "app/(dashboard)/master-data/(inventory)/uom/page.tsx",
  "app/(dashboard)/master-data/(inventory)/warehouse/page.tsx",
  "app/(dashboard)/master-data/(asset_management)/asset/page.tsx",
  "app/(dashboard)/master-data/(asset_management)/asset-category/page.tsx",
  "app/(dashboard)/master-data/(asset_management)/asset-location/page.tsx",
  "app/(dashboard)/master-data/(asset_management)/asset-status/page.tsx",
  "app/(dashboard)/master-data/(human_resource)/employee/page.tsx",
  "app/(dashboard)/master-data/(human_resource)/department/page.tsx",
  "app/(dashboard)/master-data/(human_resource)/position/page.tsx",
  "app/(dashboard)/master-data/(finance)/coa/page.tsx",
  "app/(dashboard)/master-data/(finance)/tax/page.tsx",
  "app/(dashboard)/master-data/(finance)/payment-terms/page.tsx",
  "app/(dashboard)/master-data/(system)/users/page.tsx",
  "app/(dashboard)/master-data/(system)/roles/page.tsx",
];

const importRegex = /^import .*DrawerForm.*$/m;
const filteredToInputClassRegex = /(const filtered = [\s\S]*?;\r?\n\r?\n\s*const inputClass = )/m;
const paginationInsertRegex = /(\r?\n\s*<\/div>\r?\n\r?\n\s*\{filtered\.length === 0 && \()/m;

for (const rel of files) {
  const filePath = path.join(base, rel);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING: ${rel}`);
    continue;
  }

  let text = fs.readFileSync(filePath, "utf8");
  const original = text;

  if (!text.includes("@/components/masterdata/Pagination")) {
    if (importRegex.test(text)) {
      text = text.replace(importRegex, (match) => `${match}\nimport Pagination from "@/components/masterdata/Pagination";`);
    }
  }

  if (!text.includes("const [currentPage, setCurrentPage] = useState(1);")) {
    if (filteredToInputClassRegex.test(text)) {
      text = text.replace(
        filteredToInputClassRegex,
        (match) =>
          match.replace(
            "const inputClass = ",
            "const [currentPage, setCurrentPage] = useState(1);\n  const itemsPerPage = 6;\n  const totalPages = Math.ceil(filtered.length / itemsPerPage);\n  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);\n\n  const inputClass = ",
          ),
      );
    }
  }

  text = text.replace(/onChange=\{\(e\) => set(Filter[A-Za-z0-9_]+)\(e\.target\.value\)\}/g, "onChange={(e) => { set$1(e.target.value); setCurrentPage(1); }}");
  text = text.replace(/setSearch\(''\);/g, "setSearch(''); setCurrentPage(1);");
  text = text.replace(/setSearch\(""\);/g, 'setSearch(""); setCurrentPage(1);');
  text = text.replace(/onChange=\{\(e\) => setSearch\(e\.target\.value\)\}/g, "onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}");
  text = text.replace(/filtered\.map\(/g, "paginatedData.map(");

  if (!text.includes("Pagination currentPage")) {
    if (paginationInsertRegex.test(text)) {
      text = text.replace(
        paginationInsertRegex,
        "\n        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} filteredLength={filtered.length} itemsPerPage={itemsPerPage} />\n\n        $1",
      );
    }
  }

  if (text !== original) {
    fs.writeFileSync(filePath, text, "utf8");
    console.log(`PATCHED: ${rel}`);
  } else {
    console.log(`UNCHANGED: ${rel}`);
  }
}
