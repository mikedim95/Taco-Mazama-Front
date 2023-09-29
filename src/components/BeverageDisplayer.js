import { useState, useEffect } from "react";

import Line from "../assets/Line.svg";
import { useMyContext } from "../context/UseMyContext";
import BeverageOptionLabel from "../components/BeverageOptionLabel";

import mariachi from "../assets/mariachi.wav";
function IngredientDisplayer({
  phase,
  content,
  handleNextStep,
  handlePreviousStep,
  message,
  selectedItems,
  finalSubmit,
  firstButtonPosition,
}) {
  console.log(selectedItems);
  useEffect(() => {}, []);
  //vibration notification
  const VibrationActive = () => {
    if (!navigator.vibrate) return false;
    return true;
  };

  //play sound
  const play = () => {
    new Audio(mariachi).play();
  };

  const handleClick = (beverage, multiplier) => {
    /*  if (finalBeveragesOrder.includes(beverage.title)) {
      const updatedBeverages = selectedItems.filter(
        (item) => item !== ingredient.title
      );
      setFinalBeveragesOrder(updatedBeverages);
    } else {
      setFinalBeveragesOrder([...finalBeveragesOrder, beverage.title]);
    } */
  };

  return (
    <>
      <div className="flex justify-start relative ">
        <h1
          className="absolute top-[5px] left-[30px] font-pop text-[20px] font-bold text-textFont-dark"
          style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
        >
          {message}
          <div
            className="absolute top-[25px] mr-[-100px] left-[5px] font-pop text-[10px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            {/*    {messageSub} */}
          </div>
        </h1>
      </div>
      <div className="pt-[45px] pl-[30px] mr-[20px]">
        <img className="w-full" src={Line} alt="" />
      </div>
      <div className="columns-1 px-[20px] justify-center space-y-[10px] items-center">
        {content.map((beverage, index) => {
          let item;

          try {
            item = selectedItems.find((item) => item.title === beverage.title);
          } catch (warning) {
            console.warn("There are no preselected items");
            item = null; // or any other default value you want to assign
          }
          return (
            <BeverageOptionLabel
              key={index}
              phase={phase}
              beverage={beverage}
              index={index + beverage.title}
              selectedItem={item}
              handleClick={handleClick}
            />
          );
        })}
      </div>
      <div
        className={`pt-[15px] pb-[20px] ${
          firstButtonPosition
            ? "flex justify-end items-end pr-[20px]"
            : "px-[20px] flex justify-between space-x-[10px] items-end"
        } `}
      >
        {/*  {phase !== "stuffing" ? (
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center"
            onClick={() => handlePreviousStep(phase, selectedItems)}
          >
            Προηγούμενο
          </button>
        ) : null}

        {phase === "review" ? (
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center "
            onClick={() => {
              finalSubmit();
              if (VibrationActive()) {
                navigator.vibrate([1000, 50, 1000]); // Trigger vibration if VibrationActive returns true
              }
              play();
            }}
          >
            {currentDish.index ? "Ολοκλήρωση Επεξεργασίας" : "Υποολή"}
          </button>
        ) : (
          <button
            className="w-[150px] h-[40px] rounded-full outline outline-2 outline-gray-600 bg-primary-regular font-pop text-[16px] font-normal text-center"
            onClick={() => {
              if (
                (phase === "stuffing" && !hasChosen) ||
                (phase === "ingredients" && !hasChosen) ||
                (phase === "salsa" && !hasChosen)
              ) {
                handleModal();
              } else handleNextStep(phase, selectedItems);
            }}
            // disabled={
            //   (phase === "stuffing" && !hasChosen) ||
            //   (phase === "ingredients" && !hasChosen) ||
            //   (phase === "salsa" && !hasChosen)
            // }
          >
            Επόμενο
          </button>
        )} */}
      </div>
    </>
  );
}

export default IngredientDisplayer;