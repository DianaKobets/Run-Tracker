import reviewsData from './json/reviews.json';

export function Review() {
  return (
    <div className="flex flex-wrap justify-center">
      {reviewsData.map((reviewData, index) => (
        <div 
          key={index}
          className="h-56 w-[22rem] bg-slate-900 flex flex-col rounded-xl m-5"
        >
          <h1 className="text-lg font-bold text-justify mx-5 my-4">
            {reviewData.review}
          </h1>
          <div className="flex flex-row mx-6">
            <img 
              src={reviewData.avatar} 
              alt="Avatar"
              className="h-16 w-16 rounded-full" 
            />
            <div className="flex flex-col mx-4">
              <h2 className="font-medium">
                {reviewData.name}
              </h2>
              <h3 className="text-sm font-extralight">
                {reviewData.degree}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
