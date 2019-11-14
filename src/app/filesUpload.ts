export class FilesUpload {
    id: string;
    prod_id: string;  
    data: File;
    state: string;
    inProgress: boolean;
    progress: number;
    canRetry: boolean;
    canCancel: boolean;
  }