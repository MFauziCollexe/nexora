from pathlib import Path
import re

base = Path(r"c:\xampp\htdocs\Nexora\nexora-web")
files = [
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
]

for rel in files:
    path = base / rel
    if not path.exists():
        print(f"MISSING: {path}")
        continue
    text = path.read_text(encoding="utf-8")
    original = text
    # import Pagination if needed
    if "@/components/masterdata/Pagination" not in text:
        text = re.sub(r'(import .*DrawerForm.*\n)', r'\1import Pagination from "@/components/masterdata/Pagination";\n', text, count=1)

    # add pagination state block if missing
    if "const [currentPage, setCurrentPage] = useState(1);" not in text:
        text = re.sub(
            r'(const filtered = [\s\S]*?;\n\n\s*const inputClass = )',
            r'\1const [currentPage, setCurrentPage] = useState(1);\n  const itemsPerPage = 6;\n  const totalPages = Math.ceil(filtered.length / itemsPerPage);\n  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);\n\n  const inputClass = ',
            text,
            count=1,
            flags=re.DOTALL,
        )

    # patch setFilter fields to reset page
    text = re.sub(
        r'onChange=\{\(e\) => set(Filter[A-Za-z0-9_]+)\(e\.target\.value\)\}',
        r'onChange={(e) => { set\1(e.target.value); setCurrentPage(1); }}',
        text,
    )
    # patch search input resets
    text = text.replace("setSearch('');", "setSearch(''); setCurrentPage(1);")
    text = text.replace('setSearch("");', 'setSearch(""); setCurrentPage(1);')
    # patch search onChange
    text = re.sub(
        r'onChange=\{\(e\) => setSearch\(e\.target\.value\)\}',
        r'onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}',
        text,
    )
    # patch search onChange with braces maybe
    text = re.sub(
        r'onChange=\{\(e\) => \{?\s*setSearch\(e\.target\.value\);?\s*\}?\}',
        r'onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}',
        text,
    )
    # patch filtered.map to paginatedData.map
    text = text.replace('filtered.map(', 'paginatedData.map(')
    # insert pagination block before no-results block
    if 'Pagination currentPage' not in text:
        text = re.sub(
            r'(\n\s*</div>\n\n\s*\{filtered\.length === 0 && \()',
            r'\n        </div>\n\n        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} filteredLength={filtered.length} itemsPerPage={itemsPerPage} />\n\n        \1',
            text,
            count=1,
        )
    if text != original:
        path.write_text(text, encoding="utf-8")
        print(f"PATCHED: {rel}")
    else:
        print(f"UNCHANGED: {rel}")
