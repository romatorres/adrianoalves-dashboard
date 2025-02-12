import Link from "next/link";
import { CircleUserRound } from "lucide-react";

export function AdminButton() {
  return (
    <div>
      <Link
        href="/login"
        className="text-primary rounded-full hover:text-white transition-colors flex items-center"
      >
        <CircleUserRound size={28} />
      </Link>
    </div>
  );
}
