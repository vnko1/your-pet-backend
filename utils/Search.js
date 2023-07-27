class Search {
  constructor({
    owner,
    filter,
    category,
    sex,
    date = 0,
    page = 1,
    limit = 6,
    sort = "desc",
    searchfield,
  }) {
    this.id = owner;
    this.filter = filter;
    this.category = category;
    this.sex = sex;
    this.date = date || 0;
    this.page = page || 1;
    this.limit = limit || 6;
    this.sort = sort || "desc";
    this.searchfield = searchfield;
  }

  getArticlesSearchOptions() {
    const findOptions = this.filter
      ? {
          $or: [
            { title: { $regex: this.filter, $options: "i" } },
            { text: { $regex: this.filter, $options: "i" } },
          ],
        }
      : {};
    return findOptions;
  }

  getNoticesSearchOptions() {
    const findOptions = this.filter
      ? {
          $or: [
            { title: { $regex: this.filter, $options: "i" } },
            { comments: { $regex: this.filter, $options: "i" } },
          ],
        }
      : {};

    if (this.date) {
      const currentDate = new Date();
      const dateFields = this.date.split(",");

      if (dateFields.length > 1) {
        const dates = dateFields.map((item) => {
          if (item < 1) return currentDate.setMonth(currentDate.getMonth() - 3);
          return currentDate.setFullYear(currentDate.getFullYear() - item);
        });
        const from = Math.max(...dates);
        findOptions.date = { $lte: from };
      } else {
        if (this.date < 1 && this.date > 0) {
          const from = currentDate.setMonth(currentDate.getMonth() - 3);
          const to = currentDate.setFullYear(currentDate.getFullYear() - 1);
          findOptions.date = { $lte: from, $gte: to };
        } else {
          const from = currentDate.setFullYear(
            currentDate.getFullYear() - this.date
          );
          findOptions.date = { $lte: from };
        }
      }
    }

    if (this.category) {
      findOptions.category = this.category;
    }

    if (this.sex) {
      findOptions.sex = this.sex.split(",");
    }

    if (this.id && this.searchfield === "favorites") {
      findOptions[this.searchfield] = {
        $elemMatch: { $eq: this.id },
      };
    } else if (this.id) {
      findOptions.owner = this.id;
    }

    return findOptions;
  }

  getPage() {
    const perPage = this.page > 0 ? (this.page - 1) * this.getLimit() : 0;

    return perPage;
  }

  getLimit() {
    return this.limit;
  }

  getSort(key) {
    return { [key]: this.sort };
  }
}

module.exports = { Search };
