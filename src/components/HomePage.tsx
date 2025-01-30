import { Reviews } from "./Rewiews";

export function HomePage() {
    return (
    <>
        <div className="flex flex-col items-center justify-center h-[34rem] bg-cover" 
        style={{ backgroundImage: `url('../src/img/background.png')`,
        }}>
            <h1 className="text-5xl font-bold brightness-100">Run Tracker</h1>
            <h2 className="text-3xl font-extralight">run your life</h2>
        </div>
        <Reviews />
    </>
    );
  }
  