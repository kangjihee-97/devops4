import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type { BoardDTO } from "../types/Board";
import "./BoardDetail.css";

const BoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardDTO | null>(null);

  useEffect(() => {
    if (id) {
      api
        .get<BoardDTO>(`/detail/${id}`)
        .then((res) => setBoard(res.data))
        .catch(console.error);
    }
  }, [id]);

  const handleUpdate = async () => {
    if (!board) return;
    try {
      await api.put(`/update`, board);
      alert("수정 완료");
      navigate("/");
    } catch (e) {
      alert("수정 실패");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    try {
      await api.delete(`/delete/${id}`);
      alert("삭제 완료");
      navigate("/");
    } catch (e) {
      alert("삭제 실패");
    }
  };

  if (!board) return <div className="detail-page">Loading...</div>;

  return (
    <div className="detail-page">
      <div className="detail-card">
        <h2>게시글 상세</h2>

        <div className="form-group">
          <label>작성자</label>
          <input
            className="input-field"
            value={board.creatorId || ""}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>제목</label>
          <input
            className="input-field"
            value={board.title}
            onChange={(e) => setBoard({ ...board, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>내용</label>
          <textarea
            className="textarea-field"
            value={board.contents}
            onChange={(e) => setBoard({ ...board, contents: e.target.value })}
          />
        </div>

        {board.fileList && board.fileList.length > 0 && (
          <div className="file-list">
            <label>첨부파일</label>
            <ul>
              {board.fileList.map((file) => (
                <li key={file.fileIdx}>
                  <a href={`/api/board/file/${file.fileIdx}`}>
                    {file.originalFileName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="button-group">
          <button className="btn btn-list" onClick={() => navigate("/")}>
            목록으로
          </button>
          <button className="btn btn-update" onClick={handleUpdate}>
            수정
          </button>
          <button className="btn btn-delete" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
