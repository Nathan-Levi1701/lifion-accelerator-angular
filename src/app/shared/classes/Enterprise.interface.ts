export interface EnterpriseNode {
    id: string;
    pid?: string;
    reportsToCode: string;
    code: string;
    name: string;
    parentStructure: string;
    childStructure: string;
    relationship: string;
    role: string;
    tags: Array<string>;
}