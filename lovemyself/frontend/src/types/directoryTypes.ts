// 📁 src/types/directoryTypes.ts

export interface DirectoryCreateRequest {
    tempId: number;
    name: string;
    parentId?: number;
    priority?: number;
    categories?: string[];
}

export interface DirectoryUpdateRequest {
    id: number;
    name?: string;
    priority?: number;
    categories?: string[];
}

export interface DirectorySavePayload {
    created: DirectoryCreateRequest[];
    updated: DirectoryUpdateRequest[];
    deleted: number[];
}
