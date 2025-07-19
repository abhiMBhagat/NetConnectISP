import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      unique: true,
      sparse: true, // Only unique for customers
      default: function () {
        if (this.role === "customer") {
          const date = new Date();
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const random = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0");
          return `CUST-${year}${month}-${random}`;
        }
        return undefined;
      },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "staff"], required: true },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String, default: "USA" },
    },
    serviceInfo: {
      plan: { type: String },
      speed: { type: String },
      monthlyRate: { type: Number },
      installationDate: { type: Date },
      status: {
        type: String,
        enum: ["Active", "Suspended", "Cancelled"],
        default: "Active",
      },
    },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Generate customer ID before saving
UserSchema.pre("save", function (next) {
  if (this.role === "customer" && !this.customerId) {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    this.customerId = `CUST-${year}${month}-${random}`;
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Updated dummy users for seeding with enhanced data
export const dummyUsers = [
  {
    email: "customer1@email.com",
    password: "customer1",
    role: "customer",
    firstName: "John",
    lastName: "Smith",
    phone: "+1-555-0101",
    address: {
      street: "123 Main St",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
    },
    serviceInfo: {
      plan: "High Speed Internet",
      speed: "100 Mbps",
      monthlyRate: 49.99,
      status: "Active",
    },
  },
  {
    email: "customer2@email.com",
    password: "customer2",
    role: "customer",
    firstName: "Sarah",
    lastName: "Johnson",
    phone: "+1-555-0102",
    address: {
      street: "456 Oak Ave",
      city: "Springfield",
      state: "IL",
      zipCode: "62702",
    },
    serviceInfo: {
      plan: "Premium Bundle",
      speed: "200 Mbps",
      monthlyRate: 89.99,
      status: "Active",
    },
  },
  {
    email: "staff1@company.com",
    password: "staff1",
    role: "staff",
    firstName: "Admin",
    lastName: "User",
  },
];

export default User;
