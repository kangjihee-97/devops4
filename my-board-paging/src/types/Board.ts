export interface BoardDTO {
  boardId: number;
  title: string;
  contents: string;
  hitCnt: number;
  createdDatetime: string;
  creatorId: string;
  updatedDatetime: string;
  updaterId: string;
  fileList: FileDTO[];
}

export interface FileDTO {
  fileIdx: number;
  boardId: number;
  originalFileName: string;
  storedFilePath: string;
  fileSize: number;
}

export interface PageResponse {
  startPage: number;
  endPage: number;
  total: number;
  prev: boolean;
  next: boolean;
  cri: {
    pageNum: number;
    amount: number;
    skip: number;
  };
}

export interface BoardListResponse {
  list: BoardDTO[];
  pageMaker: PageResponse;
}
