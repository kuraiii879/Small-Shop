import { cn } from '../../lib/utils';

interface PriceTagProps {
  price: number;
  salePrice?: number;
  className?: string;
}

const PriceTag = ({ price, salePrice, className }: PriceTagProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {salePrice ? (
        <>
          <span className="text-2xl font-bold text-foreground">
            ${salePrice.toFixed(2)}
          </span>
          <span className="text-lg text-muted-foreground line-through">
            ${price.toFixed(2)}
          </span>
        </>
      ) : (
        <span className="text-2xl font-bold text-foreground">
          ${price.toFixed(2)}
        </span>
      )}
    </div>
  );
};

export default PriceTag;

