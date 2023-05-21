export default {
  // Custome
  paginations() {
    if (!this.isMounted) return;

    const pagination = [];
    for (let index = 1; index <= this.maxPaginationNumber; index++) {
      if (
        this.showPagination(
          this.currentPaginationNumber,
          index,
          this.maxPaginationNumber
        ) == 1
      ) {
        pagination.push(index);
      }

      if (
        this.showPagination(
          this.currentPaginationNumber,
          index,
          this.maxPaginationNumber
        ) == 2
      ) {
        pagination.push("...");
      }
    }
    return pagination;
  },

  // index related
  currentPageFirstIndex() {
    if (!this.isMounted) return;

    return this.$refs.dataTable?.currentPageFirstIndex;
  },
  currentPageLastIndex() {
    if (!this.isMounted) return;

    return this.$refs.dataTable?.currentPageLastIndex;
  },
  clientItemsLength() {
    if (!this.isMounted) return;

    return this.$refs.dataTable?.clientItemsLength;
  },

  // pagination related
  maxPaginationNumber() {
    if (!this.isMounted) return;

    return this.$refs.dataTable?.maxPaginationNumber;
  },
  currentPaginationNumber() {
    if (!this.isMounted) return;

    return this.$refs.dataTable?.currentPaginationNumber;
  },
  isFirstPage() {
    if (!this.isMounted) return;

    return this.$refs.dataTable?.isFirstPage;
  },
  isLastPage() {
    if (!this.isMounted) return;

    return this.$refs.dataTable?.isLastPage;
  },

  // rows per page related
  rowsPerPageOptions() {
    if (!this.isMounted) return;

    // return this.$refs.dataTable?.rowsPerPageOptions;
    return [10, 25, 50, 100];
  },
  rowsPerPageActiveOption() {
    if (!this.isMounted) return;

    return this.$refs.dataTable?.rowsPerPageActiveOption;
  },
};
