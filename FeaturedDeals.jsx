import { Link } from "react-router-dom";

const deals = [
  {
    id: 1,
    title: "Goa Beach Escape",
    description: "Soak in the sun and enjoy the vibrant nightlife of Goa",
    price: 5999,
    image: "https://www.villacalangute.com/blog/escape-to-paradise-discover-the-best-isolated-beaches/escape-to-paradise-discover-the-best-isolated-beaches-large.jpg",
    type: "package",
  },
  {
    id: 2,
    title: "Kashmir Paradise Tour",
    description: "Explore the heaven on earth with our curated Kashmir tour",
    price: 11499,
    image: "https://5.imimg.com/data5/IL/SA/IS/GLADMIN-64221091/kashmir-paradise-tour-500x500.jpg",
    type: "package",
  },
  {
    id: 3,
    title: "Taj Mahal Day Trip",
    description: "Witness the grandeur of the Taj Mahal with a guided day trip",
    price: 1999,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada",
    type: "tour",
  },
  {
    id: 4,
    title: "Kerala Backwater Cruise",
    description: "Relax on a luxury houseboat through the serene backwaters of Alleppey",
    price: 8499,
    image: "https://www.keralaholidays.com/uploads/tourpackages-gallery/thumb/BackwaterCruise-HouseboatStay.jpg",
    type: "package",
  },
  {
    id: 5,
    title: "Rajasthan Desert Safari",
    description: "Camel rides and desert camping under the stars in Jaisalmer",
    price: 7499,
    image: "https://www.myrajasthantrip.com/wp-content/uploads/2023/05/camel-safari-jaisalmer.jpg",
    type: "adventure",
  },
];

const FeaturedDeals = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <h2>Featured Indian Travel Deals</h2>
          <p>Discover unforgettable experiences across India's top destinations</p>
        </div>

        <div className="grid">
          {deals.map((deal) => (
            <div key={deal.id} className="card">
              <img
                src={deal.image || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={deal.title}
                className="card-img"
              />
              <div className="card-content">
                <h3 className="card-title">{deal.title}</h3>
                <p className="card-text">{deal.description}</p>
                <div className="flex justify-between align-center">
                  <span className="price">₹{deal.price}</span>
                  <Link
                    to={`/${
                      deal.type === "flight"
                        ? "flights"
                        : deal.type === "hotel"
                        ? "hotels"
                        : deal.type === "package"
                        ? "packages"
                        : deal.type === "adventure"
                        ? "adventures"
                        : deal.type === "tour"
                        ? "tours"
                        : "services"
                    }/${deal.id}`}
                    className="btn btn-primary"
                  >
                    View Deal
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;