import {
    imagePlaceholder
} from "./constants";

const capitalizeFirstLetter = string => (string)[0].toUpperCase() + (string).slice(1);

const isImageValid = (profile) => {
    if (profile.includes("jpg")) {
        return profile;
    }
    if (profile.includes("jpeg")) {
        return profile;
    }
    if (profile.includes("png")) {
        return profile;
    }
    if (profile.includes("gif")) {
        return profile;
    }
    if (profile.includes("svg")) {
        return profile;
    }
    return imagePlaceholder;
}


const changeYoutubeLink = (inputValue) => {
    if (inputValue.includes("watch?v=")) {
        inputValue = inputValue.replace("watch?v=", "embed/");
        return inputValue
    }

    if (inputValue.includes("youtu.be/")) {
        inputValue = inputValue.replace("youtu.be/", "youtube.com/embed/");
        return inputValue
    }
}

export {
    capitalizeFirstLetter,
    isImageValid,
    changeYoutubeLink,
};