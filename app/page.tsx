"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "855966879169";

const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

type Product = {
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  {
    name: "HAOZEN PRO",
    description: "Complete pet grooming vacuum system.",
    price: 249,
    image: "/products/Pet-Grooming-Vacuum-Cleaner.jpg",
    tag: "FEATURED",
  },
  {
    name: "HAOZEN ONE",
    description: "Cordless cleaning for everyday pet hair.",
    price: 199,
    image: "/products/cordless-pet-vacuum1.webp",
    tag: "EVERYDAY CARE",
  },
  {
    name: "HAOZEN CLEAN",
    description: "A versatile pet vacuum cleaning system.",
    price: 229,
    image: "/products/Pet-Vacuum-Cleaner.png",
    tag: "PET CARE",
  },
  {
    name: "HAOZEN PRO EDITION",
    description: "Explore our featured HAOZEN grooming product.",
    price: 249,
    image: "/products/haozen-pro.jpg",
    tag: "HAOZEN COLLECTION",
  },
  {
    name: "PET GROOMING SYSTEM",
    description: "Discover another option for your pet-care routine.",
    price: 229,
    image: "/products/a0aa7d70-9b01-4511-bfa8-d425906f2ba6.jpg",
    tag: "GROOMING",
  },
  {
    name: "PET HAIR CARE",
    description: "Practical equipment for everyday pet care.",
    price: 199,
    image: "/products/Pet-Grooming-Vacuum-Cleaner.jpg",
    tag: "PET ESSENTIALS",
  },
];

const accessories = [
  {
    name: "Grooming Brush",
    image: "/products/Double-Sided-Pet-Grooming-Brus1.webp",
  },
  {
    name: "Pet Hair Dryer",
    image: "/products/pet-hair-dryer.png",
  },
  {
    name: "Dematting Comb",
    image: "/products/Pet-Dematting-Comb1.jpg",
  },
  {
    name: "Grooming Scissors",
    image: "/products/Pet-Grooming-Thinning-Scissor1.jpg",
  },
];

const gallery = [
  "/products/photo_2026-11-20_22-44-50.jpg",
  "/products/photo_2026-11-20_22-45-35.jpg",
  "/products/photo_2026-11-20_22-46-00.jpg",
  "/products/photo_2026-11-20_22-46-46.jpg",
  "/products/photo_2026-11-20_22-46-57.jpg",
  "/products/photo_2026-11-21_07-58-52.jpg",
  "/products/photo_2026-11-21_08-00-39.jpg",
  "/products/photo_2026-11-21_08-00-45.jpg",
  "/products/photo_2026-11-21_08-00-54.jpg",
  "/products/photo_2026-11-21_08-01-05.jpg",
  "/products/photo_2026-11-21_08-01-16.jpg",
  "/products/photo_2026-11-21_08-01-25.jpg",
  "/products/photo_2026-11-21_08-01-38.jpg",
  "/products/photo_2026-11-21_08-04-05.jpg",
  "/products/photo_2026-11-21_08-04-18.jpg",
  "/products/photo_2026-11-21_08-04-32.jpg",
  "/products/photo_2026-11-21_08-12-08.jpg",
  "/products/web design.jpg",
  "/products/web oet 4.jpg",
  "/products/web pet 3.jpg",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [customerNote, setCustomerNote] = useState("");

  const [showServiceForm, setShowServiceForm] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceContact, setServiceContact] = useState("");
  const [serviceMessage, setServiceMessage] = useState("");

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function addToCart(product: Product) {
    setCartItems((current) => {
      const existing = current.find(
        (item) => item.name === product.name
      );

      if (existing) {
        return current.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setCartOpen(true);
    setShowServiceForm(false);
  }

  function updateQuantity(name: string, change: number) {
    setCartItems((current) =>
      current
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(name: string) {
    setCartItems((current) =>
      current.filter((item) => item.name !== name)
    );
  }

  function checkout() {
    if (cartItems.length === 0) {
      alert("Your shopping bag is empty.");
      return;
    }

    if (!customerName.trim() || !customerContact.trim() || !customerLocation.trim()) {
      alert("Please enter your name, contact number and delivery location.");
      return;
    }

    const orderLines = cartItems
      .map((item) => `${item.name} x ${item.quantity} = $${item.price * item.quantity}`)
      .join("\n");

    const message = `Hello HAOZEN, I would like to place an order.

Customer name: ${customerName.trim()}
Contact number: ${customerContact.trim()}
Location: ${customerLocation.trim()}

ORDER DETAILS:
${orderLines}

Total items: ${cartCount}
Estimated total: $${cartTotal}

Additional information:
${customerNote.trim() || "None"}

Please confirm availability, final pricing and delivery details. Thank you.`;

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  function submitCustomerService() {
    if (!serviceName.trim() || !serviceContact.trim() || !serviceMessage.trim()) {
      alert("Please complete all customer service fields.");
      return;
    }

    const message = `Hello HAOZEN Customer Service,\n\nName: ${serviceName.trim()}\nContact: ${serviceContact.trim()}\n\nMy enquiry:\n${serviceMessage.trim()}\n\nPlease assist me. Thank you.`;

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main>
      <div className="announcement">
        THE FUTURE OF PET CARE HAS ARRIVED
      </div>

      <header className="header">
        <a href="#home" className="logo">
          HAOZEN<span>.</span>
        </a>

        <button
          className="menuButton"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#home" onClick={closeMenu}>HOME</a>
          <a href="#collection" onClick={closeMenu}>COLLECTION</a>
          <a href="#accessories" onClick={closeMenu}>ACCESSORIES</a>
          <a href="#gallery" onClick={closeMenu}>GALLERY</a>
          <a href="#about" onClick={closeMenu}>OUR STORY</a>
          <a href="#contact" onClick={closeMenu}>CUSTOMER SERVICE</a>
        </nav>

        <button
          className="cartButton"
          onClick={() => setCartOpen(true)}
        >
          BAG ({cartCount})
        </button>
      </header>

      <section className="hero" id="home">
        <div className="heroContent">
          <p className="eyebrow">PREMIUM PET CARE TECHNOLOGY</p>

          <h1>
            A CLEANER HOME.<br />
            <span>A HAPPIER PET.</span>
          </h1>

          <p className="heroText">
            Discover a new standard in pet-hair care.
            Thoughtful products and practical solutions
            for the pets you love.
          </p>

          <a href="#collection" className="goldButton">
            EXPLORE COLLECTION →
          </a>
        </div>

        <div className="heroImage">
          <img
            src="/products/HEADER.jpg"
            alt="HAOZEN pet care collection"
          />
          <p>DISCOVER THE HAOZEN COLLECTION</p>
        </div>
      </section>

      <section className="benefits">
        <div>
          <span>✧</span>
          <h3>THOUGHTFUL DESIGN</h3>
          <p>Practical solutions for pet lovers.</p>
        </div>

        <div>
          <span>◇</span>
          <h3>EVERYDAY CARE</h3>
          <p>Products designed for daily routines.</p>
        </div>

        <div>
          <span>♡</span>
          <h3>MADE FOR PET LOVERS</h3>
          <p>Because your pets deserve care.</p>
        </div>
      </section>

      <section className="collection" id="collection">
        <div className="sectionHeading">
          <p className="eyebrow">THE HAOZEN EXPERIENCE</p>
          <h2>OUR PRODUCT COLLECTION</h2>
          <p>Explore our selection of pet-care products.</p>
        </div>

        <div className="products">
          {products.map((product) => (
            <article className="productCard" key={product.name}>
              <div className="productImage">
                <span className="tag">{product.tag}</span>
                <img src={product.image} alt={product.name} />
              </div>

              <div className="productInfo">
                <h3>{product.name}</h3>
                <p>{product.description}</p>

                <div className="productBottom">
                  <strong>${product.price}</strong>

                  <button
                    className="orderButton"
                    onClick={() => addToCart(product)}
                  >
                    ORDER
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="notice">
          Product prices are provisional. Final prices and specifications
          will be confirmed before launch.
        </p>
      </section>

      <section className="accessories" id="accessories">
        <div className="sectionHeading">
          <p className="eyebrow">THE DETAILS MATTER</p>
          <h2>GROOMING ACCESSORIES</h2>
          <p>Explore useful tools for your pet-care routine.</p>
        </div>

        <div className="accessoryGrid">
          {accessories.map((item) => (
            <article className="accessoryCard" key={item.name}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>

            </article>
          ))}
        </div>
      </section>

      <section className="gallerySection" id="gallery">
        <div className="sectionHeading">
          <p className="eyebrow">THE WORLD OF HAOZEN</p>
          <h2>CARE IN EVERY DETAIL</h2>
          <p>
            Discover more of our pet-care collection and inspiration.
          </p>
        </div>

        <div className="galleryGrid">
          {gallery.map((image, index) => (
            <div className="galleryItem" key={image}>
              <img
                src={image}
                alt={`HAOZEN pet care gallery photograph ${index + 1}`}
                loading="lazy"
              />
              <a
                href={whatsappLink(
                  `Hello HAOZEN, I would like to enquire about the item shown in Gallery picture ${index + 1}.`
                )}
                className="accessoryLink galleryEnquiryLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                ENQUIRE ABOUT THIS ITEM ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="story" id="about">
        <p className="eyebrow">THE HAOZEN PHILOSOPHY</p>

        <h2>
          BETTER CARE.<br />
          <span>BEAUTIFULLY CONSIDERED.</span>
        </h2>

        <p>
          We believe caring for pets and caring for your home
          should go hand in hand. HAOZEN brings together
          thoughtful product selection and a better everyday
          pet-care experience.
        </p>

        <a href="#collection" className="goldButton">
          DISCOVER OUR COLLECTION
        </a>
      </section>

      <section className="contactSection" id="contact">
        <p className="eyebrow">WE ARE HERE TO HELP</p>
        <h2>CUSTOMER SERVICE</h2>

        <p>
          Have a question about our products, orders or availability?
          Complete our enquiry form and contact the HAOZEN customer-care team.
        </p>

        <div className="contactForm">
          <input
            type="text"
            placeholder="Your full name"
            value={serviceName}
            onChange={(event) => setServiceName(event.target.value)}
          />

          <input
            type="text"
            placeholder="Your contact number"
            value={serviceContact}
            onChange={(event) => setServiceContact(event.target.value)}
          />

          <textarea
            placeholder="How can we help you?"
            value={serviceMessage}
            onChange={(event) => setServiceMessage(event.target.value)}
          />

          <button
            className="goldButton"
            onClick={submitCustomerService}
          >
            SEND ENQUIRY ↗
          </button>
        </div>

        <p className="contactSmall">
          You can also use the customer service option in your shopping bag.
        </p>
      </section>

      <footer>
        <a className="logo" href="#home">
          HAOZEN<span>.</span>
        </a>

        <p>Elevating everyday pet care.</p>

        <div className="footerLinks">
          <a href="#collection">SHOP</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CUSTOMER SERVICE</a>
        </div>

        <small>© 2026 HAOZEN. ALL RIGHTS RESERVED.</small>
      </footer>

      {cartOpen && (
        <div
          className="cartOverlay"
          onClick={() => setCartOpen(false)}
        >
          <section
            className="cartDrawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cartHeader">
              <h2>YOUR SHOPPING BAG</h2>

              <button
                className="closeCart"
                onClick={() => setCartOpen(false)}
              >
                ×
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="emptyCart">
                <p>Your shopping bag is currently empty.</p>

                <button
                  className="goldButton"
                  onClick={() => setCartOpen(false)}
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <>
                <div className="cartItems">
                  {cartItems.map((item) => (
                    <div className="cartItem" key={item.name}>
                      <img src={item.image} alt={item.name} />

                      <div className="cartItemInfo">
                        <h3>{item.name}</h3>
                        <p>${item.price} each</p>

                        <div className="quantityControls">
                          <button
                            onClick={() => updateQuantity(item.name, -1)}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() => updateQuantity(item.name, 1)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="removeItem"
                          onClick={() => removeItem(item.name)}
                        >
                          REMOVE
                        </button>
                      </div>

                      <strong>
                        ${item.price * item.quantity}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="cartForm">
                  <h3>ORDER INFORMATION</h3>

                  <input
                    type="text"
                    placeholder="Your name"
                    value={customerName}
                    onChange={(event) =>
                      setCustomerName(event.target.value)
                    }
                  />

                  <input
                    type="tel"
                    placeholder="Your contact number"
                    value={customerContact}
                    onChange={(event) =>
                      setCustomerContact(event.target.value)
                    }
                  />

                  <input
                    type="text"
                    placeholder="Your delivery location"
                    value={customerLocation}
                    onChange={(event) =>
                      setCustomerLocation(event.target.value)
                    }
                  />

                  <textarea
                    placeholder="Additional notes or bulk order requests"
                    value={customerNote}
                    onChange={(event) =>
                      setCustomerNote(event.target.value)
                    }
                  />

                  <div className="cartTotal">
                    <span>Total ({cartCount} items)</span>
                    <strong>${cartTotal}</strong>
                  </div>

                  <div className="checkoutChoices">
                    <button
                      className="checkoutButton"
                      onClick={checkout}
                    >
                      WHATSAPP ORDER ↗
                    </button>

                    <button
                      className="serviceChoiceButton"
                      onClick={() => {
                        setShowServiceForm(!showServiceForm);
                      }}
                    >
                      CUSTOMER SERVICE
                    </button>
                  </div>

                  {showServiceForm && (
                    <div className="serviceForm">
                      <h3>CONTACT HAOZEN CUSTOMER CARE</h3>

                      <p>
                        Have a question about a product or your order?
                        Send us an enquiry.
                      </p>

                      <input
                        type="text"
                        placeholder="Your full name"
                        value={serviceName}
                        onChange={(event) =>
                          setServiceName(event.target.value)
                        }
                      />

                      <input
                        type="text"
                        placeholder="Your contact number"
                        value={serviceContact}
                        onChange={(event) =>
                          setServiceContact(event.target.value)
                        }
                      />

                      <textarea
                        placeholder="How can we help you?"
                        value={serviceMessage}
                        onChange={(event) =>
                          setServiceMessage(event.target.value)
                        }
                      />

                      <button
                        className="checkoutButton"
                        onClick={submitCustomerService}
                      >
                        SEND ENQUIRY ↗
                      </button>
                    </div>
                  )}

                  <p className="checkoutNote">
                    Your order details will be sent to HAOZEN customer care
                    for confirmation. Please review your message before sending.
                  </p>
                </div>
              </>
            )}
          </section>
        </div>
      )}

      <button
        className="floatingBag"
        onClick={() => setCartOpen(true)}
        aria-label="Open shopping bag"
      >
        BAG ({cartCount})
      </button>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #11110f;
          color: #f5f1e8;
          font-family: Arial, Helvetica, sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input,
        textarea {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .announcement {
          background: #c4a366;
          color: #17140e;
          text-align: center;
          padding: 11px;
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: bold;
        }

        .header {
          min-height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          border-bottom: 1px solid #ffffff20;
          background: #10100f;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .logo {
          font-family: Georgia, serif;
          font-size: 31px;
          letter-spacing: 4px;
          font-weight: bold;
        }

        .logo span {
          color: #c4a366;
        }

        .nav {
          display: flex;
          gap: 17px;
        }

        .nav a,
        .cartButton {
          font-size: 10px;
          letter-spacing: 1px;
          color: #ddd4c3;
        }

        .nav a:hover {
          color: #c4a366;
        }

        .cartButton {
          background: transparent;
          border: 1px solid #c4a366;
          padding: 12px 15px;
          color: #c4a366;
        }

        .menuButton {
          display: none;
          background: none;
          border: 0;
          color: #c4a366;
          font-size: 25px;
        }

        .hero {
          min-height: 570px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 35px;
          padding: 65px 8%;
          background:
            radial-gradient(ellipse at 75% 45%, #55452b55, transparent 48%),
            #11110f;
        }

        .eyebrow {
          color: #c4a366;
          letter-spacing: 3px;
          font-size: 10px;
          font-weight: bold;
        }

        .hero h1 {
          font-family: Georgia, serif;
          font-size: clamp(40px, 5vw, 65px);
          line-height: 1.1;
          font-weight: normal;
        }

        .hero h1 span,
        .story h2 span {
          color: #c4a366;
        }

        .heroText {
          max-width: 430px;
          line-height: 1.9;
          color: #bcb8ae;
          font-size: 14px;
          margin-bottom: 30px;
        }

        .goldButton {
          display: inline-block;
          background: #c4a366;
          color: #17140e;
          padding: 16px 23px;
          font-size: 10px;
          letter-spacing: 1.5px;
          font-weight: bold;
          border: 0;
        }

        .goldButton:hover {
          background: #e0c58d;
        }

        .heroImage {
          text-align: center;
        }

        .heroImage img {
          width: 100%;
          max-height: 410px;
          object-fit: contain;
          background: #f0ede7;
          border-radius: 8px;
          padding: 15px;
        }

        .heroImage p {
          color: #c4a366;
          font-size: 10px;
          letter-spacing: 3px;
        }

        .benefits {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: 40px 8%;
          background: #1a1916;
          border-top: 1px solid #c4a36655;
          border-bottom: 1px solid #c4a36655;
          text-align: center;
          gap: 20px;
        }

        .benefits span {
          color: #c4a366;
          font-size: 25px;
        }

        .benefits h3 {
          font-size: 10px;
          letter-spacing: 2px;
        }

        .benefits p {
          font-size: 12px;
          color: #aaa49a;
        }

        .collection,
        .accessories {
          padding: 85px 8%;
          background: #f1eee7;
          color: #171612;
        }

        .sectionHeading {
          text-align: center;
          margin-bottom: 40px;
        }

        .sectionHeading h2 {
          font-family: Georgia, serif;
          font-weight: normal;
          font-size: 36px;
          letter-spacing: 2px;
        }

        .sectionHeading > p:last-child {
          color: #77736b;
          font-size: 13px;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          max-width: 1150px;
          margin: auto;
        }

        .productCard {
          background: white;
        }

        .productImage {
          height: 290px;
          position: relative;
          background: #eae7e0;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .productImage img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .tag {
          position: absolute;
          z-index: 1;
          top: 15px;
          left: 15px;
          background: #c4a366;
          color: #17140e;
          padding: 7px 9px;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .productInfo {
          padding: 22px;
        }

        .productInfo h3 {
          font-family: Georgia, serif;
          letter-spacing: 2px;
          font-size: 19px;
        }

        .productInfo p {
          font-size: 12px;
          color: #77736b;
          min-height: 35px;
          line-height: 1.6;
        }

        .productBottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #e8e5de;
          padding-top: 18px;
          gap: 8px;
        }

        .productBottom strong {
          font-family: Georgia, serif;
          font-size: 22px;
        }

        .orderButton {
          background: #171612;
          color: #c4a366;
          padding: 13px 22px;
          font-size: 10px;
          letter-spacing: 1.5px;
          font-weight: bold;
          border: 0;
        }

        .orderButton:hover {
          background: #c4a366;
          color: #171612;
        }

        .notice {
          text-align: center;
          color: #77736b;
          font-size: 11px;
          margin-top: 30px;
        }

        .accessoryGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .accessoryCard {
          background: white;
          padding: 15px;
          text-align: center;
        }

        .accessoryCard img {
          width: 100%;
          height: 190px;
          object-fit: contain;
        }

        .accessoryCard h3 {
          font-family: Georgia, serif;
          font-size: 15px;
        }

        .accessoryLink {
          display: inline-block;
          margin: 10px 0;
          font-size: 9px;
          letter-spacing: 1px;
          color: #8b6a31;
          font-weight: bold;
        }

        .gallerySection {
          padding: 85px 7%;
          background: #151411;
          color: #f5f1e8;
        }

        .gallerySection .sectionHeading > p:last-child {
          color: #aaa49a;
        }

        .galleryGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .galleryItem {
          overflow: hidden;
          background: #24221d;
          border: 1px solid #c4a36633;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .galleryItem img {
          display: block;
          width: 100%;
          aspect-ratio: 1 / 1;
          height: auto;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .galleryEnquiryLink {
          align-self: center;
          text-align: center;
          padding: 12px 8px;
          margin: 0;
          line-height: 1.5;
        }

        .galleryItem:hover img {
          transform: scale(1.06);
        }

        .story {
          padding: 95px 20px;
          text-align: center;
          background:
            radial-gradient(ellipse at center, #54452c44, transparent 60%),
            #141412;
        }

        .story h2 {
          font-family: Georgia, serif;
          font-weight: normal;
          font-size: clamp(30px, 4vw, 48px);
          line-height: 1.3;
        }

        .story h2 span {
          color: #c4a366;
        }

        .story > p:not(.eyebrow) {
          max-width: 560px;
          margin: 25px auto 32px;
          color: #bcb8ae;
          font-size: 13px;
          line-height: 1.9;
        }

        .contactSection {
          padding: 85px 20px;
          text-align: center;
          background: #f1eee7;
          color: #171612;
        }

        .contactSection h2 {
          font-family: Georgia, serif;
          font-weight: normal;
          font-size: 36px;
          letter-spacing: 2px;
        }

        .contactSection > p:not(.eyebrow) {
          max-width: 550px;
          margin: 20px auto 30px;
          color: #77736b;
          font-size: 13px;
          line-height: 1.9;
        }

        .contactForm {
          width: 100%;
          max-width: 520px;
          margin: 30px auto;
          display: grid;
          gap: 12px;
          text-align: left;
        }

        .contactForm input,
        .contactForm textarea {
          width: 100%;
          padding: 15px;
          border: 1px solid #d4ccbd;
          background: white;
          color: #171612;
          outline-color: #c4a366;
          font-size: 13px;
        }

        .contactForm textarea {
          min-height: 120px;
          resize: vertical;
        }

        .contactForm .goldButton {
          justify-self: start;
          cursor: pointer;
        }

        .contactSmall {
          font-size: 11px !important;
        }

        footer {
          text-align: center;
          padding: 55px 20px 30px;
          background: #0b0b0a;
        }

        footer > p {
          color: #aaa49a;
          font-size: 12px;
        }

        .footerLinks {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin: 30px 0;
          flex-wrap: wrap;
        }

        .footerLinks a {
          font-size: 9px;
          letter-spacing: 2px;
          color: #c4a366;
        }

        footer small {
          color: #777;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .floatingBag {
          position: fixed;
          right: 22px;
          bottom: 22px;
          z-index: 20;
          background: #c4a366;
          color: #17140e;
          border: 0;
          padding: 15px 20px;
          font-size: 11px;
          font-weight: bold;
          letter-spacing: 1px;
          box-shadow: 0 4px 20px #0005;
        }

        .cartOverlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          background: #000b;
          display: flex;
          justify-content: flex-end;
        }

        .cartDrawer {
          width: 100%;
          max-width: 500px;
          height: 100%;
          overflow-y: auto;
          background: #f1eee7;
          color: #171612;
          padding: 25px;
        }

        .cartHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #ccc5b7;
          padding-bottom: 15px;
        }

        .cartHeader h2 {
          font-family: Georgia, serif;
          font-size: 21px;
          font-weight: normal;
        }

        .closeCart {
          background: none;
          border: 0;
          font-size: 32px;
          color: #171612;
        }

        .emptyCart {
          text-align: center;
          padding: 70px 15px;
          color: #77736b;
          line-height: 2;
        }

        .cartItems {
          padding-top: 15px;
        }

        .cartItem {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 18px 0;
          border-bottom: 1px solid #d9d3c7;
        }

        .cartItem > img {
          width: 85px;
          height: 85px;
          object-fit: contain;
          background: white;
        }

        .cartItemInfo {
          flex: 1;
        }

        .cartItemInfo h3 {
          font-size: 13px;
          margin: 0 0 5px;
        }

        .cartItemInfo p {
          color: #77736b;
          font-size: 11px;
          margin: 0 0 10px;
        }

        .cartItem > strong {
          font-size: 13px;
          white-space: nowrap;
        }

        .quantityControls {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .quantityControls button {
          width: 27px;
          height: 27px;
          background: #171612;
          color: #c4a366;
          border: 0;
        }

        .quantityControls span {
          font-size: 13px;
        }

        .removeItem {
          background: none;
          border: 0;
          color: #986b38;
          font-size: 9px;
          margin-top: 9px;
          padding: 0;
        }

        .cartForm {
          padding-top: 25px;
        }

        .cartForm h3 {
          font-family: Georgia, serif;
          font-size: 17px;
          font-weight: normal;
          letter-spacing: 1px;
        }

        .cartForm input,
        .cartForm textarea {
          width: 100%;
          padding: 13px;
          margin: 7px 0;
          border: 1px solid #d4ccbd;
          background: white;
          color: #171612;
          outline-color: #c4a366;
          font-size: 12px;
        }

        .cartForm textarea {
          min-height: 85px;
          resize: vertical;
        }

        .cartTotal {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #ccc5b7;
          padding: 20px 0;
          margin-top: 12px;
          font-size: 14px;
        }

        .cartTotal strong {
          font-family: Georgia, serif;
          font-size: 25px;
        }

        .checkoutChoices {
          display: grid;
          gap: 12px;
        }

        .checkoutButton {
          width: 100%;
          padding: 17px;
          background: #c4a366;
          color: #17140e;
          border: 0;
          font-weight: bold;
          font-size: 11px;
          letter-spacing: 2px;
        }

        .checkoutButton:hover {
          background: #dfc48b;
        }

        .serviceChoiceButton {
          width: 100%;
          padding: 16px;
          background: #171612;
          color: #c4a366;
          border: 1px solid #c4a366;
          font-size: 11px;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .serviceChoiceButton:hover {
          background: #30291e;
        }

        .serviceForm {
          margin-top: 22px;
          padding: 18px;
          background: #e7e2d8;
          border: 1px solid #c4a366;
        }

        .serviceForm h3 {
          font-family: Georgia, serif;
          font-size: 17px;
          font-weight: normal;
        }

        .serviceForm p {
          color: #77736b;
          font-size: 12px;
          line-height: 1.7;
        }

        .serviceForm input,
        .serviceForm textarea {
          width: 100%;
          padding: 13px;
          margin: 7px 0;
          border: 1px solid #d4ccbd;
          background: white;
          color: #171612;
          font-size: 12px;
        }

        .serviceForm textarea {
          min-height: 90px;
          resize: vertical;
        }

        .checkoutNote {
          color: #77736b;
          font-size: 10px;
          line-height: 1.7;
          text-align: center;
        }

        @media (max-width: 1050px) {
          .nav {
            gap: 10px;
          }

          .nav a {
            font-size: 9px;
          }
        }

        @media (max-width: 750px) {
          .header {
            min-height: 68px;
            padding: 0 5%;
          }

          .logo {
            font-size: 24px;
          }

          .menuButton {
            display: block;
          }

          .nav {
            display: none;
            position: absolute;
            top: 68px;
            left: 0;
            right: 0;
            background: #171612;
            padding: 25px;
            flex-direction: column;
            gap: 22px;
          }

          .nav.open {
            display: flex;
          }

          .hero {
            grid-template-columns: 1fr;
            padding: 55px 7%;
          }

          .heroImage img {
            max-height: 330px;
          }

          .benefits {
            grid-template-columns: 1fr;
          }

          .products {
            grid-template-columns: 1fr;
            max-width: 430px;
          }

          .accessoryGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .galleryGrid {
            grid-template-columns: repeat(2, 1fr);
            gap: 9px;
          }

          .collection,
          .accessories,
          .gallerySection {
            padding: 60px 6%;
          }

          .sectionHeading h2 {
            font-size: 27px;
          }

          .contactSection h2 {
            font-size: 29px;
          }

          .cartDrawer {
            padding: 18px;
          }
        }

        @media (max-width: 380px) {
          .accessoryGrid {
            grid-template-columns: 1fr;
          }

          .cartItem {
            gap: 8px;
          }

          .cartItem > img {
            width: 65px;
            height: 65px;
          }
        }
      `}</style>
    </main>
  );
}