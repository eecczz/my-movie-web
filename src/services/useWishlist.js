// useWishlist.js
class WishlistManager {
  constructor() {
    this.wishlist = JSON.parse(localStorage.getItem('movieWishlist')) || [];
  }

  toggleWishlist(movie) {
    const index = this.wishlist.findIndex(item => item.id === movie.id);
    if (index === -1) {
      this.wishlist.push(movie);
    } else {
      this.wishlist.splice(index, 1);
    }
    this.saveWishlist();
  }

  saveWishlist() {
    localStorage.setItem('movieWishlist', JSON.stringify(this.wishlist));
  }

  getWishlist() {
    return this.wishlist;
  }
}

export default new WishlistManager();
