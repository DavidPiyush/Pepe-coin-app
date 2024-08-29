import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// console.log(apiUrl, "this from apiurl");

export const fetchData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/`);
    // console.log("Data fetched successfully:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(
        "Server error:",
        error.response.status,
        error.response.data
      );
      // Handle specific status codes if necessary
      if (error.response.status === 404) {
        console.error(
          "Resource not found:",
          error.response.data.message || error.response.data
        );
      } else {
        console.error(
          "Other server-side error:",
          error.response.data.message || error.response.data
        );
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }
    // Re-throw the error if needed
    throw error;
  }
};

export const fetchDataUser = async (ethereumId) => {
  try {
    const response = await axios.get(`${apiUrl}/user/${ethereumId}`);
    // console.log("Fetched user data:", response.data);
    return response.data; // Return response data
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(
        "Server error:",
        error.response.status,
        error.response.data
      );
      if (error.response.status === 404) {
        // Handle case where user is not found
        console.error(
          "User not found:",
          error.response.data.message || error.response.data
        );
      } else {
        // Handle other server-side errors
        console.error(
          "Other server-side error:",
          error.response.data.message || error.response.data
        );
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }
    // Re-throw the error if needed
    throw error;
  }
};

export const postDataFromUser = async (data) => {
  try {
    // console.log("Data to post:", data);

    const response = await axios.post(`${apiUrl}/create`, data);
    // console.log("User created successfully:", response.data);

    return response.data; // Return response if needed
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(
        "Server error:",
        error.response.status,
        error.response.data
      );
      if (error.response.status === 400) {
        // Handle validation errors or bad requests
        console.error("Validation error:", error.response.data.error);
      } else {
        // Handle other server-side errors
        console.error(
          "Other server-side error:",
          error.response.data.message || error.response.data
        );
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }
    // Re-throw the error if needed
    throw error;
  }
};
export const updateUserData = async (ethereumId, data) => {
  try {
    // console.log("Ethereum ID:", ethereumId);
    // console.log("Data to update:", data);

    const response = await axios.put(
      `${apiUrl}/user/update/${ethereumId}`,
      data
    );
    console.log("User data updated successfully:", response.data);

    return response.data; // Return response if needed
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(
        "Server error:",
        error.response.status,
        error.response.data
      );
      if (error.response.status === 400) {
        // Handle specific errors like duplicate Ethereum ID
        console.error("Validation error:", error.response.data.error);
      } else {
        // Handle other server-side errors
        console.error(
          "Other server-side error:",
          error.response.data.message || error.response.data
        );
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }
    // Re-throw the error if you want it to be caught further up
    throw error;
  }
};

export const fetchUserByReferId = async (referralCode) => {
  try {
    return await axios.get(`${apiUrl}/refer/code/${referralCode}`);
  } catch (error) {
    console.log("Error while fetching user based on referralCode", error);
  }
};

export const updateUserByReferedId = async (referralCode, obj) => {
  try {
    const response = await axios.put(
      `${apiUrl}/refer/update/code/${referralCode}`,
      obj
    );
    console.log("User data updated successfully:", response.data);

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log("Error:", error.response.data.error); // Check the error message
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const socialLinks = async (ethereumId, socialLinks) => {
  try {
    if (socialLinks) {
      const link = await axios.put(`${apiUrl}/user/social/link/${ethereumId}`, {
        socialLinks: socialLinks,
      });
      console.log("User sucessFully update link");

      return link;
    }
  } catch (error) {
    console.log(error);
  }
};

export const ClaimBtn = async (ethereumId, clickCount) => {
  try {
    const count = await axios.put(`${apiUrl}/user/count/click/${ethereumId}`, {
      clickCount:clickCount,
    });
    console.log("User sucessFully update link", count.data);

    return count;
  } catch (error) {
    console.log(error, "Not Found");
  }
};
