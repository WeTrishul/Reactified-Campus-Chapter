const fetch = require("node-fetch");

module.exports.codeforecesRating = async (user) => {
  try {
    const codeforcesData = await fetch(
      "https://codeforces.com/api/user.info?handles=" + user.codeforces
    ).then((response) => response.json());
    const codeforcesRatings = codeforcesData.result[0].rating;
    if (codeforcesData.status === "FAILED") {
      return 0;
    }

    return codeforcesRatings;
  } catch (error) {
    console.log("Error in fetching ratings from codeforces", error);
    return 0;
  }
};

module.exports.codeChefRating = async (user) => {
  try {
    const codechefData = await fetch(
      "https://competeapi.vercel.app/user/codechef/" + user.codechef
    ).then((response) => response.json());

    console.log({ codechefData });

    if (
      codechefData.status === "Failed" ||
      codechefData.error === "User not found"
    ) {
      return 0;
    }

    const codechefRatings = codechefData?.rating_number;

    return codechefRatings;
  } catch (error) {
    console.log("Error in fetching ratings from codeChef", error);
    return 0;
  }
};

module.exports.leetCodeRating = async (user) => {
  try {
    const leetcodeData = await fetch(
      "https://leetcode-stats-api.herokuapp.com/" + user.leetcode
    ).then((response) => response.json());
    const leetcodeRatings = leetcodeData.contributionPoints;
    console.log({ leetcodeData });

    if (leetcodeData.status === "Failed" || leetcodeData.status === "error") {
      return 0;
    }
    return leetcodeRatings;
  } catch (error) {
    console.log("Error in fetching ratings from leetcode", error);
    return 0;
  }
};
