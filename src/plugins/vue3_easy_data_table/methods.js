export default {
  // Custome
  showPagination(current, paginate, max) {
    // Show First or Last or active paging
    if (paginate == 1 || paginate == max || current == paginate) {
      return 1;
    }

    // If active paging is less than 4
    if (current < 4) {
      if (paginate < 3 + current || paginate > max - (4 - current)) {
        return 1;
      }

      if (paginate == 3 + current) {
        return 2;
      }
    }

    if (current > max - 3) {
      if (
        paginate > max - 3 - (max - current) ||
        paginate < 4 - (max - current)
      ) {
        return 1;
      }

      if (paginate == max - (3 + (max - current))) {
        return 2;
      }
    }

    if (current > 3 && current < max - 2) {
      if (paginate == current - 1 || paginate == current + 1) {
        return 1;
      }
      // if (paginate == current - 2 || paginate == current + 2) {
      //   return 1;
      // }

      if (paginate == current - 2 || paginate == current + 2) {
        return 2;
      }
      // if (paginate == current - 3 || paginate == current + 3) {
      //   return 2;
      // }
    }
  },
  nextPage() {
    this.$refs.dataTable.nextPage();
  },
  prevPage() {
    this.$refs.dataTable.prevPage();
  },
  updatePage(paginationNumber) {
    this.$refs.dataTable.updatePage(paginationNumber);
  },
  updateRowsPerPageSelect(e) {
    this.$refs.dataTable.updateRowsPerPageActiveOption(Number(e.target.value));
  },
};
