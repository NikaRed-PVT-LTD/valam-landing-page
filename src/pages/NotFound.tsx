import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container notfound">
      <h1>Page not found</h1>
      <p>The page you were looking for does not exist or has moved.</p>
      <Button href="/" arrow>Back to home</Button>
    </div>
  );
}
