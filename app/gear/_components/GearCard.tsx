import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IGear } from "@/types/types";

const GearCard = ({ gear }: { gear: IGear }) => {
    return (
        <Card className="group gap-3 pt-0 overflow-hidden h-full">
             <Link href={`/gear/${gear.id}`}>
            {/* placeholder visual until backend serves gear images */}
            <div className="relative flex h-40 items-center justify-center bg-linear-to-br from-primary/20 via-primary/5 to-muted">
                <Dumbbell className="size-14 text-primary/50 transition-transform duration-300 group-hover:scale-110" />
                <Badge
                    variant={gear.isAvailable ? "default" : "destructive"}
                    className="absolute top-3 right-3"
                >
                    {gear.isAvailable ? "Available" : "Unavailable"}
                </Badge>
            </div>

            <CardContent className="flex flex-col gap-2 grow px-4 pt-4">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold leading-tight line-clamp-1">{gear.title}</h3>
                    <Badge variant="outline" className="bg-primary/25">{gear.category?.name}</Badge>
                </div>
                {/* <p className="text-sm text-muted-foreground line-clamp-2">{gear.description}</p> */}
                <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">{gear.brand}</span>
                    <span className="font-bold text-3xl text-primary">
                        ${gear.pricePerDay}
                        <span className="text-sm font-normal text-muted-foreground"> /day</span>
                    </span>
                </div>
            </CardContent>
{/* 
            <CardFooter className="px-4 pb-4">
                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link href={`/gear/${gear.id}`}>
                        View Details
                        <ArrowRight />
                    </Link>
                </Button>
            </CardFooter> */}
            </Link>
        </Card>
    );
};

export default GearCard;
