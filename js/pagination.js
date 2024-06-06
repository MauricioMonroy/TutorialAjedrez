document.addEventListener("DOMContentLoaded", function() {
    const itemsPerPage = 3;
    const container = document.getElementById("content-container");
    const items = container.children;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    let currentPage = 1;
  
    function showPage(page) {
      currentPage = page;
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      Array.from(items).forEach((item, index) => {
        item.style.display = (index >= start && index < end) ? "block" : "none";
      });
      updatePagination();
    }
  
    function updatePagination() {
      document.querySelectorAll(".pagination .page-item").forEach((item) => {
        const page = item.querySelector(".page-link").getAttribute("data-page");
        if (page) {
          item.classList.remove("active");
          if (parseInt(page) === currentPage) {
            item.classList.add("active");
          }
        }
      });
      document.getElementById("prev-page").classList.toggle("disabled", currentPage === 1);
      document.getElementById("next-page").classList.toggle("disabled", currentPage === totalPages);
    }
  
    document.querySelectorAll(".pagination .page-link").forEach(link => {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        const page = this.getAttribute("data-page");
        if (page) {
          showPage(parseInt(page));
        } else if (this.parentElement.id === "prev-page" && currentPage > 1) {
          showPage(currentPage - 1);
        } else if (this.parentElement.id === "next-page" && currentPage < totalPages) {
          showPage(currentPage + 1);
        }
      });
    });
  
    showPage(1);
  });
  