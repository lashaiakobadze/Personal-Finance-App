// try/catch alternative, after coughing error this method trow's errors in global middleware with next
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
