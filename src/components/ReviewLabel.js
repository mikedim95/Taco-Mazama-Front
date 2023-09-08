import { CgMathPlus, CgMathMinus } from "react-icons/cg";
import Lottie from "lottie-react";
import bin from "../assets/bin.json";
import pen from "../assets/pen.json";

function ReviewLabel({
  handleMultiplier,
  currentDish,
  currentSide,
  currentBeverage,
  index,
  buttonDelete,
  dishPrice,
  sidePrice,
  beveragePrice,
  onDelete,
}) {
  var content = {};

  if (currentDish) {
    content = {
      title: currentDish.title,
      subtitle: [
        currentDish.stuffing && currentDish.stuffing.length > 0
          ? currentDish.stuffing.join(", ")
          : null,
        currentDish.ingredients && currentDish.ingredients.length > 0
          ? currentDish.ingredients.join(", ")
          : null,
        currentDish.salsa && currentDish.salsa.length > 0
          ? currentDish.salsa.join(", ")
          : null,
        currentDish.extra && currentDish.extra.length > 0
          ? currentDish.extra.join(", ")
          : null,
      ]
        .filter((item) => item !== null) // Remove null entries
        .join(", "),
      multiplier: currentDish.multiplier,
    };
  } else if (currentSide) {
    content = {
      title: currentSide.title,
      subtitle: currentSide.subtitle,
      multiplier: currentSide.multiplier,
    };
  } else if (currentBeverage) {
    content = {
      title: currentBeverage.title,
      subtitle: currentBeverage.subtitle,
      multiplier: currentBeverage.multiplier,
    };
  }

  return (
    <div className=" relative">
      <div className="w-auto h-auto flex flex-col rounded-[20px] bg-[#DFE3BA] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]">
        <div
          className="absolute right-[10px] top-[10px] font-pop text-[13px] font-bold text-textFont-dark"
          style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
        >
          {dishPrice > 0 && <span>{dishPrice} €</span>}
          {sidePrice > 0 && <span>{sidePrice} €</span>}
          {beveragePrice > 0 && <span>{beveragePrice} €</span>}
        </div>
        <div className="pt-[20px] pl-[10px] text-[18px] font-pop text-left font-bold text-textFont-dark">
          {content.title}
        </div>
        <div className="pl-[10px] pr-[5px] text-[14px] font-pop text-left font-normal text-textFont-dark">
          {content.subtitle}
        </div>
        <div className="pt-[50px]">
          <div className="w-[140px] h-[40px] absolute bottom-0 left-0 bg-[#E6C013] rounded-tr-[20px] rounded-bl-[20px]">
            <div className="columns-3">
              <div
                className=" text-[18px] py-[10px] px-[20px] font-pop text-center font-bold text-black"
                onClick={() => handleMultiplier(index, content.multiplier - 1)}
              >
                <CgMathMinus size="20px" />
              </div>
              <div className="text-center py-[7px] text-[18px] font-pop  font-bold text-black">
                {content.multiplier}
              </div>
              <div
                className=" text-[18px] py-[10px] font-pop text-center font-bold text-black"
                onClick={() => handleMultiplier(index, content.multiplier + 1)}
              >
                <CgMathPlus size="20px" />
              </div>
            </div>
          </div>
          {buttonDelete && (
            <div>
              <div
                className="w-[40px] h-[40px] flex justify-center items-center  absolute bottom-0 right-0 bg-[#cc6655] rounded-tl-[20px] rounded-br-[20px]"
                onClick={() => {
                  onDelete("dish" || "side" || "beverage");
                }}
              >
                <Lottie
                  animationData={bin}
                  speed={1}
                  loop={false}
                  className="mb-[10px]"
                />
              </div>
              <div className="flex justify-start align-bottom">
                <Lottie
                  animationData={pen}
                  speed={0.2}
                  loop={false}
                  className="w-[60px] h-[60px] ml-[130px] absolute bottom-0"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewLabel;
