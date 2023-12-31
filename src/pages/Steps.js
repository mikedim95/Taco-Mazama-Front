import Stepper from "../components/Stepper";
import { stuffing, ingredients, salsa, extra } from "../helpers/menu";
import { useMyContext } from "../context/UseMyContext";
import IngredientDisplayer from "../components/IngredientDisplayer";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom"; /* 
import postJsonData from "../helpers/functionalComponents/postRequestToBack"; */
import { useState, useEffect, useRef } from "react";
import { HiArrowCircleLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
/* debugger; */
function Steps() {
  const { currentDish, setCurrentDish, setFinalDishOrder } = useMyContext();

  const navigate = useNavigate();

  const [basePrice, setBasePrice] = useState(
    currentDish.basePrice ? currentDish.basePrice : currentDish.middlePrice
  );
  const [multiplier, setMultiplier] = useState(
    currentDish.multiplier ? currentDish.multiplier : 1
  );
  const [extraCosts, setExtraCosts] = useState(
    currentDish.extraCosts ? currentDish.extraCosts : 0
  );
  const [nextPosition, setNextPosition] = useState(0);
  const [comment, setComment] = useState(
    currentDish.comment ? currentDish.comment : ""
  );
  const [size, setSize] = useState(
    currentDish.size ? currentDish.size : "middle"
  );
  const scrollToTopRef = useRef(null);
  //count clicks

  const order = () => {
    if (nextPosition === 0) {
      return (
        <IngredientDisplayer
          key="stuffing"
          phase={"stuffing"}
          content={stuffing}
          handleNextStep={handleNextStep}
          message={"Διάλεξε τη Γέμισή σου"}
          messageSub={"*Θα πρέπει να κάνετε τουλάχιστον 1 επιλογή"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          firstButtonPosition
        />
      );
    } else if (nextPosition === 1) {
      return (
        <IngredientDisplayer
          key="ingredients"
          phase={"ingredients"}
          content={ingredients}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          message={"Διάλεξε τα υλικά σου"}
          messageSub={"*Θα πρέπει να κάνετε τουλάχιστον 1 επιλογή"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
        />
      );
    } else if (nextPosition === 2) {
      return (
        <IngredientDisplayer
          key="salsa"
          phase={"salsa"}
          content={salsa}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          message={"Διάλεξε τη Salsas"}
          messageSub={"*Θα πρέπει να κάνετε τουλάχιστον 1 επιλογή"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
        />
      );
    } else if (nextPosition === 3) {
      return (
        <IngredientDisplayer
          key="extra"
          phase={"extra"}
          content={extra}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          message={"Extra Υλικά"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
        />
      );
    } else if (nextPosition === 4) {
      return (
        <IngredientDisplayer
          key="review"
          phase={"review"}
          currentDish={currentDish}
          finalSubmit={finalSubmit}
          handlePreviousStep={handlePreviousStep}
          message={"Δες τι έχτισες ..."}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          handleMultiplier={handleMultiplier}
          multiplier={multiplier}
          handleCommentChange={handleCommentChange}
          comment={comment}
        />
      );
    }
  };

  useEffect(() => {
    setCurrentDish({ ...currentDish, multiplier: multiplier });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCommentChange = (newComment) => {
    setComment(newComment);
  };
  const handleSetSize = (size) => {
    setSize(size);
    handleBasePrice(size);
  };

  const handleNextStep = (category, selection) => {
    setCurrentDish({ ...currentDish, [category]: selection });
    setNextPosition(nextPosition + 1);
    // scrolling to the top of the page
    scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handlePreviousStep = (category, selection) => {
    setNextPosition(nextPosition - 1);
    setCurrentDish({ ...currentDish, [category]: selection });
    // scrolling to the top of the page
    scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const addExtraCost = (value) => {
    setExtraCosts(extraCosts + value);
  };
  const subExtraCost = (value) => {
    setExtraCosts(extraCosts - value);
  };
  const handleBasePrice = (size) => {
    switch (size) {
      case "middle":
        setBasePrice(7);
        break;
      case "big":
        setBasePrice(12);
        break;
      default:
        setBasePrice(0);
    }
  };

  const handleMultiplier = (index, value) => {
    if (value > 0) {
      setMultiplier(value);
      setCurrentDish({ ...currentDish, multiplier: value });
    }
  };
  const finalSubmit = () => {
    const addingLastValues = {
      ...currentDish,
      multiplier: multiplier,
      basePrice: basePrice,
      extraCosts: extraCosts,
      size: size,
      comment: comment,
    };

    setFinalDishOrder((prevFinalDishOrder) => {
      var updatedFinalDishOrder;
      if (currentDish.index === undefined) {
        updatedFinalDishOrder = [...prevFinalDishOrder, addingLastValues];
      } else {
        prevFinalDishOrder[currentDish.index] = addingLastValues;
        updatedFinalDishOrder = prevFinalDishOrder;
      }
      localStorage.setItem(
        "finalDishOrder",
        JSON.stringify(updatedFinalDishOrder)
      );
      return updatedFinalDishOrder;
    });
    localStorage.removeItem("currentDish");
    navigate("/LandingPage");
  };

  const initialImage = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: "0%" },
  };

  return (
    <div className="max-w-screen-sm h-screen mx-auto bg-background-light overflow-y-scroll">
      <m.div
        initial="hidden"
        animate="visible"
        variants={initialImage}
        transition={{ duration: 1.4, delay: 0.7, ease: "easeInOut" }}
        ref={scrollToTopRef}
        className="justify-center items-center relative"
      >
        <img
          className="w-full h-full mb-[30px] z-0 aspect-[3/2] object-cover items-center rounded-b-[30px]"
          src={currentDish.img}
          alt=""
        />
        <Link to={"/LandingPage"}>
          <HiArrowCircleLeft
            size="35px"
            className="z-10 absolute top-[10px] left-[20px] bg-primary-regular rounded-full"
          />
        </Link>
        <div
          className="z-30 p-1 mx-[20px] my-[-10px] absolute top-[90px] left-[20px] right-[20px] rounded-[20px] font-pop italic text-[14px] font-normal backdrop-blur-xl text-center text-white outline-textFont-dark outline outline-[0.2px]"
          style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)" }}
        >
          {currentDish.subtitle}
        </div>
      </m.div>
      <m.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-full h-full flex flex-col "
      >
        <div className="flex justify-center pl-[5px]">
          <Stepper nextPosition={nextPosition} stepsNumber={5} />
        </div>
        <div className="flex justify-end relative">
          <h1
            className="absolute right-[30px] top-[-40px] font-pop text-[20px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            Συνολική Τιμή: {(basePrice + extraCosts) * multiplier} €
          </h1>
        </div>
        {currentDish.largePrice !== undefined ? (
          <div className="flex justify-between mx-[20px] gap-[20px]">
            <button
              className={`w-[150px] h-[40px] top-[5px] ml-[10px] rounded-full ${
                size === "middle"
                  ? "bg-primary-regular outline outline-2 outline-gray-600"
                  : "bg-[#AEAEAE]"
              } font-pop text-[16px] font-semibold text-center`}
              onClick={() => handleSetSize("middle")}
            >
              Μεσαίο {currentDish.middlePrice} €
            </button>
            <button
              className={`w-[150px] h-[40px] top-[5px]  rounded-full ${
                size === "big"
                  ? "bg-primary-regular outline outline-2 outline-gray-600"
                  : "bg-[#AEAEAE]"
              } font-pop text-[16px] font-semibold text-center`}
              onClick={() => handleSetSize("big")}
            >
              Μεγάλο {currentDish.largePrice} €
            </button>
          </div>
        ) : (
          <div className="flex justify-between mx-[20px] gap-[20px]">
            <button
              className={`w-[180px] h-[40px] top-[5px] ml-[0px] rounded-full ${
                size === "middle"
                  ? "bg-primary-regular outline outline-2 outline-gray-600"
                  : "bg-[#AEAEAE]"
              } font-pop text-[16px] font-semibold text-center`}
              onClick={() => handleSetSize("middle")}
              disabled={true}
            >
              Ένα μέγεθος {currentDish.middlePrice} €
            </button>
          </div>
        )}

        <div className="pt-[10px]">{order()}</div>
      </m.div>
    </div>
  );
}

export default Steps;
