module.exports = {
    getMenu: function (req, resp) {
        if (req.decoded.role === 'user') {
            resp.status(200).json([
                {
                    title: "Weekly status",
                    iconClass: "fa fa-space-shuttle",
                    href: "statuses"
                }
            ]);
        } else if (req.decoded.role === 'admin') {
            resp.status(200).json([            
                {
                    title: "Weekly status",
                    iconClass: "fa fa-space-shuttle",
                    href: "statuses"
                },
                {
                    title: "Q-Feedback",
                    iconClass: "fa fa-space-shuttle",
                    href: "feedbacks"
                }
            ]);
        }
    }
};