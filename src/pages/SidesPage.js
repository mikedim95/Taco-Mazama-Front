import { useMyContext } from "../context/UseMyContext";
import { motion as m } from "framer-motion";
import SidesDisplayer from "../components/SidesDisplayer";
import { useState, useRef, useEffect } from "react";
import { stuffing, ingredients, salsa, extra } from "../helpers/menu";
import Stepper from "../components/Stepper";
import { useNavigate } from "react-router-dom";
import { HiArrowCircleLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
// import ReviewLabel from "../components/ReviewLabel";

function SidesPage() {
  const { currentSide, setCurrentSide, setFinalSidesOrder, finalSidesOrder } =
    useMyContext();
  console.log(currentSide);
  const [comment, setComment] = useState(
    currentSide.comment ? currentSide.comment : ""
  );
  const [nextPosition, setNextPosition] = useState(0);
  const scrollToTopRef = useRef(null);
  const [extraCosts, setExtraCosts] = useState(0);
  const [multiplier, setMultiplier] = useState(currentSide.multiplier || 1);

  const [extraNachos] = useState([
    ...ingredients.filter(
      (item) => item.title === "Jalapenos" || item.title === "Sour Cream"
    ),
    ...extra.filter(
      (item) => item.title === "Guacamole" || item.title === "Chorizo"
    ),
  ]);

  const [extraSalsa] = useState([
    ...salsa,
    ...ingredients.filter((item) => item.title === "Sour Cream"),
    ...extra.filter((item) => item.title === "Guacamole"),
  ]);
  const handleCommentChange = (newComment) => {
    setComment(newComment);
  };
  // const [extraDip] = useState([
  //   ...salsa.map((item) => ({
  //     ...item,
  //     extraPrice: 1.5,
  //   })),
  //   ...ingredients
  //     .filter((item) => item.title === "Sour Cream")
  //     .map((item) => ({
  //       ...item,
  //       extraPrice: 1.5,
  //     })),
  //   ...extra
  //     .filter((item) => item.title === "Guacamole")
  //     .map((item) => ({
  //       ...item,
  //       extraPrice: 1.5,
  //     })),
  // ]);
  const order = () => {
    if (nextPosition === 0 && currentSide.title === "Loaded Nachos") {
      return (
        <SidesDisplayer
          key="stuffing"
          phase={"stuffing"}
          content={stuffing}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          message={"Διάλεξε γέμιση"}
          messageSub={"*Θα πρέπει να επιλέξτε 1 υλικό υποχρεωτικά"}
          firstButtonPosition
          handleCommentChange={handleCommentChange}
          comment={comment}
        />
      );
    } else if (nextPosition === 0 && currentSide.title === "Tortilla Chips") {
      return (
        <SidesDisplayer
          key="review"
          phase={"review"}
          currentSide={currentSide}
          finalSubmit={finalSubmit}
          handlePreviousStep={handlePreviousStep}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          message={"Δεν περιέχουν γέμιση"}
          handleMultiplier={handleMultiplier}
          multiplier={multiplier}
          firstButtonPosition
          handleCommentChange={handleCommentChange}
          comment={comment}
        />
      );
    } else if (
      nextPosition === 0 &&
      currentSide.title === "Tortilla Salsas & Guacamole"
    ) {
      return (
        <SidesDisplayer
          key="salsa"
          phase={"salsa"}
          content={extraSalsa}
          handleNextStep={handleNextStep}
          message={"Διάλεξε Salsas"}
          messageSub={"*Θα πρέπει να επιλέξτε 1 υλικό υποχρεωτικά"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          firstButtonPosition
          handleCommentChange={handleCommentChange}
          comment={comment}
        />
      );
    } else if (nextPosition === 0 && currentSide.title === "Dips") {
      return (
        <SidesDisplayer
          key="salsa"
          phase={"salsa"}
          content={extraSalsa}
          handleNextStep={handleNextStep}
          message={"Διάλεξε Salsas"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          firstButtonPosition
          handleCommentChange={handleCommentChange}
          comment={comment}
        />
      );
    } else if (nextPosition === 0) {
      return (
        <SidesDisplayer
          key="salsa"
          phase={"salsa"}
          content={salsa}
          handleNextStep={handleNextStep}
          message={"Διάλεξε Salsas"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          firstButtonPosition
          handleCommentChange={handleCommentChange}
          comment={comment}
        />
      );
    } else if (nextPosition === 0 && currentSide.title === "Tortilla Salsas") {
      return (
        <SidesDisplayer
          key="salsa"
          phase={"salsa"}
          content={salsa}
          handleNextStep={handleNextStep}
          message={"Διάλεξε Salsas"}
          messageSub={"*Θα πρέπει να επιλέξτε 1 υλικό υποχρεωτικά"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          firstButtonPosition
          handleCommentChange={handleCommentChange}
          comment={comment}
        />
      );
    } else if (nextPosition === 1 && currentSide.title === "Loaded Nachos") {
      return (
        <SidesDisplayer
          key="salsa"
          phase={"salsa"}
          content={salsa}
          handleNextStep={handleNextStep}
          message={"Διάλεξε Salsas"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          handleCommentChange={handleCommentChange}
          comment={comment}
        />
      );
    } else if (nextPosition === 1 && currentSide.title === "Nachos") {
      return (
        <SidesDisplayer
          key="extra"
          phase={"extra"}
          content={extraNachos}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          message={"Extra Υλικά"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          handleCommentChange={handleCommentChange}
          comment={comment}
        />
      );
    } else if (nextPosition === 1) {
      return (
        <SidesDisplayer
          key="review"
          phase={"review"}
          currentSide={currentSide}
          finalSubmit={finalSubmit}
          handlePreviousStep={handlePreviousStep}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          message={"Δες τι έχτισες ..."}
          handleMultiplier={handleMultiplier}
          multiplier={multiplier}
          handleCommentChange={handleCommentChange}
          comment={comment}
        />
      );
    } else if (nextPosition === 2 && currentSide.title === "Loaded Nachos") {
      return (
        <SidesDisplayer
          key="extra"
          phase={"extra"}
          content={extraNachos}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          message={"Extra Υλικά"}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          handleCommentChange={handleCommentChange}
          comment={comment}
        />
      );
    } else if (nextPosition === 2 && currentSide.title === "Nachos") {
      return (
        <SidesDisplayer
          key="review"
          phase={"review"}
          currentSide={currentSide}
          finalSubmit={finalSubmit}
          handlePreviousStep={handlePreviousStep}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          message={"Δες τι έχτισες ..."}
          handleMultiplier={handleMultiplier}
          multiplier={multiplier}
          handleCommentChange={handleCommentChange}
          comment={comment}
        />
      );
    } else if (nextPosition === 3 && currentSide.title === "Loaded Nachos") {
      return (
        <SidesDisplayer
          key="review"
          phase={"review"}
          currentSide={currentSide}
          finalSubmit={finalSubmit}
          handlePreviousStep={handlePreviousStep}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          message={"Δες τι έχτισες ..."}
          handleMultiplier={handleMultiplier}
          multiplier={multiplier}
          handleCommentChange={handleCommentChange}
          comment={comment}
        />
      );
    } else if (
      nextPosition === 2 &&
      currentSide.title === "Tortilla Salsas & Guacamole"
    ) {
      return (
        <SidesDisplayer
          key="review"
          phase={"review"}
          currentSide={currentSide}
          finalSubmit={finalSubmit}
          handlePreviousStep={handlePreviousStep}
          addExtraCost={addExtraCost}
          subExtraCost={subExtraCost}
          message={"Δες τι έχτισες ..."}
          handleMultiplier={handleMultiplier}
          multiplier={multiplier}
          handleCommentChange={handleCommentChange}
          comment={comment}
        />
      );
    }
  };

  useEffect(() => {
    setCurrentSide({ ...currentSide, multiplier: multiplier });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNextStep = (category, selection) => {
    setCurrentSide({ ...currentSide, [category]: selection });
    setNextPosition(nextPosition + 1);
    // scrolling to the top of the page
    scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handlePreviousStep = (category, selection) => {
    setNextPosition(nextPosition - 1);
    setCurrentSide({ ...currentSide, [category]: selection });
    // scrolling to the top of the page
    scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const addExtraCost = (value) => {
    setExtraCosts(extraCosts + value);
  };
  const subExtraCost = (value) => {
    setExtraCosts(extraCosts - value);
  };

  const handleMultiplier = (index, value) => {
    if (value > 0) {
      setMultiplier(value);
      setCurrentSide({ ...currentSide, multiplier: value });
    }
  };

  const navigate = useNavigate();

  const finalSubmit = () => {
    const addingLastValues = {
      ...currentSide,
      multiplier: multiplier,
      extraCosts: extraCosts,
      comment: comment,
    };

    setFinalSidesOrder((prevFinalSidesOrder) => {
      var updatedFinalSidesOrder;
      if (currentSide.index === undefined) {
        updatedFinalSidesOrder = [...prevFinalSidesOrder, addingLastValues];
      } else {
        prevFinalSidesOrder[currentSide.index] = addingLastValues;
        updatedFinalSidesOrder = prevFinalSidesOrder;
      }
      localStorage.setItem(
        "finalSidesOrder",
        JSON.stringify(updatedFinalSidesOrder)
      );
      return updatedFinalSidesOrder;
    });
    localStorage.removeItem("currentSide");
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
          className="w-full h-full mb-[30px] aspect-[3/2] object-cover items-center rounded-b-[30px]"
          src={currentSide.img}
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
          {currentSide.subtitle}
        </div>
      </m.div>
      <m.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-full h-full flex flex-col "
      >
        <div className="flex justify-center pl-[5px]">
          <Stepper nextPosition={nextPosition} />
        </div>
        <div className="flex justify-end relative ">
          <h1
            className="absolute right-[30px] top-[-20px] font-pop text-[20px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            Συνολική Τιμή: {(currentSide.price + extraCosts) * multiplier} €
          </h1>
          {/* <h1
            className="absolute pt-[20px] top-[10px] left-[30px] font-pop text-[18px] font-bold text-textFont-dark"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
          >
            Συνοδευτικό ...
          </h1>
          <div className="pt-[60px] pl-[30px] mr-[20px]">
            <img className="w-full" src={Line} alt="" />
          </div> */}
        </div>
        <div className="columns-1 justify-center space-y-[10px] items-center">
          {/* <ReviewLabel
            currentSide={currentSide}
            handleMultiplier={handleMultiplier}
          /> */}
          <div className="pt-[20px]">{order()}</div>
        </div>
      </m.div>
    </div>
  );
}

export default SidesPage;
