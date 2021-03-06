// npm packages
const createService = require('microcore');

// our packages
const {generateSummary} = require('./summary');

// service config
const serviceConfig = require('../config');

module.exports = async () =>
  createService({
    config: serviceConfig,
    onInit() {
      // triggered on service init
      console.log('Summary processing service started!');
    },
    async onJob(data, done) {
      // die if no data
      if (!data) {
        done();
        return;
      }

      // get text from data
      const {_id, text} = data;

      // do not process articles without IDs and text
      if (!text || !_id) {
        done();
        return;
      }
      // run corenlp
      const result = await generateSummary(text);
      // return result
      done(null, {_id, ...result});
    },
  });
