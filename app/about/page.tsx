import { Calendar, CreditCard, Dumbbell, RotateCcw, Search, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    icon: Search,
    title: "Browse Gear",
    description: "Explore our wide collection of sports and outdoor equipment. Filter by category, brand, or availability.",
  },
  {
    icon: Calendar,
    title: "Pick Dates",
    description: "Select your rental start and end dates using our interactive date picker. See total cost instantly.",
  },
  {
    icon: RotateCcw,
    title: "Rent & Return",
    description: "Complete secure payment, pick up your gear, enjoy your adventure, and return when done.",
  },
];

const features = [
  {
    icon: Dumbbell,
    title: "Wide Selection",
    description: "From camping tents to gym equipment, find gear for every sport and outdoor activity.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Pay safely through Stripe or SSLCommerz. Your payment information is always protected.",
  },
  {
    icon: Shield,
    title: "Trusted Providers",
    description: "All gear is verified and maintained by trusted rental providers in your area.",
  },
];

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-20">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 text-center">
        <Badge variant="secondary" className="px-4 py-1.5 text-sm">
          About GearUp
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Rent Sports & Outdoor Gear
          <span className="text-primary"> Instantly</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          GearUp connects athletes, adventurers, and fitness enthusiasts with
          top-quality sports equipment — without the cost of ownership. Rent
          what you need, when you need it.
        </p>
      </section>

      {/* How It Works */}
      <section className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-muted-foreground">Three simple steps to get your gear</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <Card key={i} className="relative text-center py-8">
              <CardHeader className="items-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-2">
                  <step.icon className="size-7" />
                </div>
                <Badge variant="outline" className="absolute top-4 right-4">
                  {i + 1}
                </Badge>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Why Choose GearUp</h2>
          <p className="text-muted-foreground">Built for convenience, trust, and affordability</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="text-center py-8">
              <CardHeader className="items-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-2">
                  <feature.icon className="size-7" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/50 rounded-3xl py-14 px-8 text-center flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-muted-foreground max-w-lg">
          Browse hundreds of sports gear listings and find exactly what you need
          for your next adventure.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
