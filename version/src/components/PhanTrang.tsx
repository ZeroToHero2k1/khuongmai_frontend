type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const getPagesToShow = (currentPage: number, totalPages: number): (number | string)[] => {
  const pages: (number | string)[] = [];

  if (totalPages <= 5) {
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(0); // luôn hiện trang đầu

  if (currentPage > 2) pages.push("...");

  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 0 && i < totalPages - 1) {
      pages.push(i);
    }
  }

  if (currentPage < totalPages - 3) pages.push("...");

  pages.push(totalPages - 1); // luôn hiện trang cuối

  return pages;
};

const PhanTrang = ({ currentPage, totalPages, onPageChange }:PaginationProps) => {
  const pages = getPagesToShow(currentPage, totalPages);

  return (
    <div className="d-flex justify-content-end mt-3">
      <nav>
        <ul className="pagination mb-0">
          {/* Prev button */}
          <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
              «
            </button>
          </li>

          {/* Page numbers */}
          {pages.map((page, idx) => (
            <li
              key={idx}
              className={`page-item ${
                page === currentPage ? "active" : ""
              } ${page === "..." ? "disabled" : ""}`}
            >
              {page === "..." ? (
                <span className="page-link">...</span>
              ) : (
                <button className="page-link" onClick={() => onPageChange(Number(page))}>
                  {Number(page) + 1}
                </button>
              )}
            </li>
          ))}

          {/* Next button */}
          <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
              »
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PhanTrang;