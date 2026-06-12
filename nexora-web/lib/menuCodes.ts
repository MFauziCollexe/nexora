/**
 * Menu Code Structure for Role-Based Access Control
 * 
 * Format: Each level has independent codes
 * - M: Main Menu (M00-M12)
 * - S: Submenu (S01-S06)
 * - C: Child/Detail Menu (C01-C06)
 * 
 * Example: Master Data > Business Partner > Customer = M01, S01, C01
 */

export const MENU_CODES = {
  // Main Menus
  DASHBOARD: "M00",
  MASTER_DATA: "M01",
  SALES: "M02",
  PURCHASE: "M03",
  INVENTORY: "M04",
  PRODUCTION: "M05",
  FINANCE: "M06",
  HR_PAYROLL: "M07",
  ASSETS_MANAGEMENT: "M08",
  PROJECT: "M09",
  CRM: "M10",
  REPORTS_ANALYTICS: "M11",
  SETTINGS: "M12",

  // Master Data > Business Partner (S01)
  BUSINESS_PARTNER: "S01",
  CUSTOMER: "C01",
  SUPPLIER: "C02",
  VENDOR: "C03",

  // Master Data > Inventory (S02)
  INVENTORY_SUBMENU: "S02",
  ITEM_MASTER: "C01",
  CATEGORY: "C02",
  BRAND: "C03",
  UOM: "C04",
  WAREHOUSE: "C05",

  // Master Data > Asset Management (S03)
  ASSET_MANAGEMENT: "S03",
  ASSET: "C01",
  ASSET_CATEGORY: "C02",
  ASSET_LOCATION: "C03",
  ASSET_STATUS: "C04",

  // Master Data > Human Resource (S04)
  HUMAN_RESOURCE: "S04",
  EMPLOYEE: "C01",
  DEPARTMENT: "C02",
  POSITION: "C03",

  // Master Data > Finance (S05)
  FINANCE_SUBMENU: "S05",
  COA: "C01",
  TAX: "C02",
  PAYMENT_TERMS: "C03",

  // Master Data > System (S06)
  SYSTEM: "S06",
  USERS: "C01",
  ROLES: "C02",
} as const;

export type MenuCode = typeof MENU_CODES[keyof typeof MENU_CODES];

/**
 * Build full permission code path from menu hierarchy
 * @param mainCode - Main menu code (M01, M02, etc)
 * @param subCode - Optional submenu code (S01, S02, etc)
 * @param childCode - Optional child menu code (C01, C02, etc)
 * @returns Full permission code (e.g., M01.S01.C01)
 * 
 * Example:
 * buildMenuCode("M01", "S01", "C01") // "M01.S01.C01"
 * buildMenuCode("M01", "S01") // "M01.S01"
 * buildMenuCode("M01") // "M01"
 */
export function buildMenuCode(mainCode: string, subCode?: string, childCode?: string): string {
  let code = mainCode;
  if (subCode) code += "." + subCode;
  if (childCode) code += "." + childCode;
  return code;
}

/**
 * Check if a user has permission to access a menu based on their allowed codes
 * @param userMenuCodes - Array of permission codes assigned to the user
 * @param requiredMainCode - Main menu code required
 * @param requiredSubCode - Optional submenu code required
 * @param requiredChildCode - Optional child menu code required
 * @returns boolean - true if user has permission
 * 
 * Example:
 * hasMenuAccess(["M00", "M01.S01.C01"], "M01", "S01", "C01") // true
 * hasMenuAccess(["M00"], "M01", "S01", "C01") // false
 * hasMenuAccess(["M01"], "M01", "S01", "C01") // true (parent access)
 * hasMenuAccess(["M01.S01"], "M01", "S01", "C01") // true (parent access)
 */
export function hasMenuAccess(
  userMenuCodes: string[],
  requiredMainCode: string,
  requiredSubCode?: string,
  requiredChildCode?: string
): boolean {
  const requiredCode = buildMenuCode(requiredMainCode, requiredSubCode, requiredChildCode);
  
  return userMenuCodes.some((code) => {
    // Exact match
    if (code === requiredCode) return true;
    
    // Parent code match (e.g., M01 grants access to M01.S01.C01)
    if (requiredCode.startsWith(code + ".")) return true;
    
    return false;
  });
}

/**
 * Get all menu codes that a user can access based on a parent code
 * Useful for automatically granting access to all submenus
 * @param parentCode - Parent menu code (e.g., "M01" or "M01.S01")
 * @returns Array of all codes under that parent
 * 
 * Example:
 * getSubMenuCodes('M01') // ['M01', 'M01.S01', 'M01.S02', ...]
 * getSubMenuCodes('M01.S01') // ['M01.S01', 'M01.S01.C01', 'M01.S01.C02', ...]
 */
export function getSubMenuCodes(parentCode: string): string[] {
  // This is a placeholder - in real implementation, you'd query from menu structure
  // For now, it returns the parent code itself as the base
  return [parentCode];
}

/**
 * Extract menu level from code
 * @param code - Menu code
 * @returns Object with main, sub, and child codes
 * 
 * Example:
 * parseMenuCode('M01.S01.C01') // { main: 'M01', sub: 'S01', child: 'C01' }
 * parseMenuCode('M01.S01') // { main: 'M01', sub: 'S01' }
 */
export function parseMenuCode(code: string): { main?: string; sub?: string; child?: string } {
  const parts = code.split(".");
  return {
    main: parts[0],
    sub: parts[1],
    child: parts[2],
  };
}
