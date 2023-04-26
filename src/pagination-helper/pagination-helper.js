function Pagination (contents, len) {
    this._contents = contents || []
    this._len = len || 1

    this.page_count = function () {
        return Math.ceil( this._contents.length / this._len )
    }

    this.item_count = function () {
        return this._contents.length
    }

    this.page_item_count = function (page) {
        const count = [...this._contents]
            .filter( (v, i) => i >= this._len * page && i < this._len * (page + 1))
            .length

        return count || -1
    }

    this.page_index = function (index) {
        if (index < 0)  return -1

        const page = Math.floor((index + 1) / this._len)
        return page > this.page_count() ? -1 : page
    }
}

const PaginationHelper = {
    new: (arr, len) => new Pagination(arr, len)
}

const helper = PaginationHelper.new(['a','b','c','d','e','f'], 4)
console.log(helper.page_count()) // should == 2
console.log(helper.item_count()) // should == 6
console.log(helper.page_item_count(0) ) // should == 4
console.log(helper.page_item_count(1)) // last page - should == 2
console.log(helper.page_item_count(2)) // should == -1 since the page is invalid

console.log(helper.page_index(5)) // should == 1 (zero based index)
console.log(helper.page_index(2)) // should == 0
console.log(helper.page_index(20)) // should == -1
console.log(helper.page_index(-10)) // should == -1 because negative indexes are invalid
