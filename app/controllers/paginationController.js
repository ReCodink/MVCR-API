class PaginationController{
    constructor(pageService) {
        this.pageService = pageService;
    }

    getMoviePagination = async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        try {
            const { count, rows } = await this.pageService.getMoviePagination(limit, startIndex);

            const results = {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
            };

            if (startIndex > 0) {
                results.previousPage = page - 1;
            }

            if (startIndex + limit < count) {
                results.nextPage = page + 1;
            }

            results.results = rows;
            res.status(200).json({
                message: 'Get Pagination Movies Successfully',
                data: results
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Get Pagination Movies Failed' });
        }
    };

    getUserPagination = async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        try {
            const { count, rows } = await this.pageService.getUserPagination(limit, startIndex);

            const results = {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
            };

            if (startIndex > 0) {
                results.previousPage = page - 1;
            }

            if (startIndex + limit < count) {
                results.nextPage = page + 1;
            }

            results.results = rows;
            res.status(200).json({
                message: 'Get Pagination Users Successfully',
                data: results
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Get Pagination Users Failed' });
        }
    };
}

module.exports = PaginationController;