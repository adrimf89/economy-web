export const handlePagination = (page, links) => {
  let prev = undefined;
  let next = undefined;

  links.forEach(link => {
    if (link.rel === "prev") {
      prev = link.href.split("?")[1];
    } else if (link.rel === "next") {
      next = link.href.split("?")[1];
    }
  });

  let currentPageElements = 0;
  if (page) {
    if (page.totalPages <= 1) {
      currentPageElements = page.totalElements;
    } else if (page.number + 1 < page.totalPages) {
      currentPageElements = page.size;
    } else {
      const fullPageElements = page.size * (page.totalPages - 1);
      currentPageElements = page.totalElements - fullPageElements;
    }
  }

  return {
    currentPage: page ? page.number + 1 : 0,
    currentPageElements: currentPageElements,
    totalElements: page ? page.totalElements : 0,
    totalPages: page ? page.totalPages : 0,
    pageSize: page ? page.size : 0,
    prevPage: prev,
    nextPage: next
  };
};
