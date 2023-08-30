export interface Employee {
  empName: string;
  units: number;
  totalRevenue: number;
  rank: number;
}

export interface RegionRecord {
  regionName: string;
  employees: Employee[];
}
