async function logout (req, res){
    res.clearCookie("refreshToken", {
        httpOnly: true,
    });
    res.clearCookie("accessToken", {
        httpOnly: true,
    });

    return res.status(200).json({
        message: "Logged out successfully",
    });
};

module.exports = logout;