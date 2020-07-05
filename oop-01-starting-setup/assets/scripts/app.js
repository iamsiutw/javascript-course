class Product {
  title = 'DEFAULT'
  imageUrl
  price
  description

  constructor(title, img, dec, price) {
    this.title = title
    this.imageUrl = img
    this.description = dec
    this.price = price
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName
    this.value = attrValue
  }
}

class Component {
  constructor(renderHookID, shouldRender = true) {
    this.hookID = renderHookID
    if (shouldRender) {
      this.render()
    }
  }

  render() { }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag)
    if (cssClasses) {
      rootElement.className = cssClasses
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value)
      }
    }
    document.getElementById(this.hookID).append(rootElement)
    return rootElement
  }
}

class ProductItem extends Component {
  constructor(product, renderHookID) {
    super(renderHookID, false)
    this.product = product
    this.render()
  }

  addToCart() {
    App.addProductToCart(this.product)
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item')
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" />
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `
    const addBtn = prodEl.querySelector('button')
    addBtn.addEventListener('click', this.addToCart.bind(this))
  }
}


class ProductList extends Component {
  products = [
    new Product(
      'A pillow',
      'https://images.crateandbarrel.com/is/image/Crate/PellicciaPillowGroupFHS19',
      'A pillow',
      19.99
    ),
    new Product(
      'A carpet',
      'https://ae01.alicdn.com/kf/Hb6ed5de492a0424e88f90ab64d3f1633j.jpg',
      'A carpet',
      89.99
    )
  ]

  constructor(renderHookID) {
    super(renderHookID)
    this.fetchProducts()
    // this.render()
  }

  fetchProducts() {
    this.products = [
      new Product(
        'A pillow',
        'https://images.crateandbarrel.com/is/image/Crate/PellicciaPillowGroupFHS19',
        'A pillow',
        19.99
      ),
      new Product(
        'A carpet',
        'https://ae01.alicdn.com/kf/Hb6ed5de492a0424e88f90ab64d3f1633j.jpg',
        'A carpet',
        89.99
      )
    ]
    this.renderProducts()
  }

  renderProducts() {
    for (const prod of this.products) {
      // const prodEl = new ProductItem(prod, 'product-list')
      new ProductItem(prod, 'product-list')
      // prodEl.render()
    }
  }

  render() {
    this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'product-list')])
    if (this.products && this.products.length > 0) {
      this.renderProducts()
    }
  }
}

class ShoppingCart extends Component {
  items = []

  set cartItems(value) {
    this.items = value
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`
  }

  get totalAmount() {
    const sum = this.items.reduce((preValue, curItem) => preValue + curItem.price, 0)
    return sum
  }

  constructor(renderHookID) {
    super(renderHookID, false)
    this.orderProduct = () => {
      console.log('order...')
      console.log(this.items)
    }
    this.render()
  }

  addProduct(product) {
    const updatedItems = [...this.items, product]
    this.cartItems = updatedItems
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart')
    cartEl.innerHTML = `
    <h2>Total: \$${0}</h2>
    <button>Order now!</button>
    `
    const orderBtn = cartEl.querySelector('button')
    orderBtn.addEventListener('click', this.orderProduct)
    this.totalOutput = cartEl.querySelector('h2')
  }
}

class Shop {

  constructor() {
    // super()
    this.render()
  }

  render() {
    this.shoppingCart = new ShoppingCart('app')
    // this.shoppingCart.render()
    // const productsList = new ProductList('app')
    new ProductList('app')
    // productsList.render()
  }
}

class App {
  static shoppingCart

  static init() {
    const shop = new Shop()
    // shop.render()
    this.shoppingCart = shop.shoppingCart
  }

  static addProductToCart(product) {
    this.shoppingCart.addProduct(product)
  }
}

App.init()

