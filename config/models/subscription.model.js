import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Subscription price must be greater than 0"]
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP"],
        default: "USD"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
        default: "monthly"
    },
    category: {
        type: String,
        enum: ["streaming", "gaming", "music", "video", "other"],
        default: "other"
    },
    paymentMethod: {
        type: String,
        enum: ["credit_card", "paypal", "bank_transfer", "apple_pay", "google_pay", "other"],
        default: "credit_card"
    },
    status: {
        type: String,
        enum: ["active", "expired", "cancelled"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value < new Date(),
            message: "Start date must be in the past"
        }
    },
    nextRenewalDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: "Next renewal date must be after start date"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }
    

}, {timestamps: true});

// calculate next renewal date if not set
// determine if expired sub
subscriptionSchema.pre("save", async function(next) {

    if(!this.nextRenewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.nextRenewalDate = new Date(this.startDate);
        this.nextRenewalDate.setDate(this.nextRenewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if (this.nextRenewalDate < new Date()) {
        this.status = "expired";
    }

    next();
});

const subscription = mongoose.model("Subscription", subscriptionSchema);

export default subscription;
