import { cn } from "clsx-tailwind-merge";

function PasswordStrength({ passStrength }: { passStrength: number }) {
  return (
    <div className="col-span-2 grid grid-cols-4 gap-2">
      {Array.from({ length: passStrength + 1 }).map((i, idx) => (
        <div
          key={idx}
          className={cn("h-2 rounded-full w-full", {
            "bg-red-500": passStrength === 0,
            "bg-orange-500": passStrength === 1,
            "bg-yellow-500": passStrength === 2,
            "bg-green-500": passStrength === 3
          })}></div>
      ))}
    </div>
  );
}

export default PasswordStrength;
