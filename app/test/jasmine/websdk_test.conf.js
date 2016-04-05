module.exports = function(config) {
  config.set({
    basePath: './',
    autoWatch: true,
    frameworks: ['jasmine'],
    logLevel: config.LOG_LEVEL_INFO,
    files: [

      '../../src/const/constants.js',

      '../../src/response/response.js', '../../src/rest/httprequest.js',
      '../../src/util/util.js', '../../src/sdk.js',

      '../../src/impl/authImpl.js', '../../src/impl/appModelImpl.js',
      '../../src/impl/consumerImpl.js',
      '../../src/impl/enrollmentImpl.js',
      '../../src/impl/verificationImpl.js',
      '../../src/impl/callImpl.js', '../../src/impl/anaysisImpl.js',


      //'../../../output/knurldsdk.js',

      'specConst.js', 'specHelper.js',
      'spec/sdk/auth/accessTokenAPISpecs.js',
      'spec/sdk/auth/statusAPISpecs.js',

      'spec/sdk/appModel/addAppModelAPISpecs.js',
      'spec/sdk/appModel/getAppModelAPISpecs.js',
      'spec/sdk/appModel/getAppModelsAPISpecs.js',
      'spec/sdk/appModel/updateAppModelAPISpecs.js',
      'spec/sdk/appModel/deleteAppModelAPISpecs.js',

      'spec/sdk/consumer/addConsumerAPISpecs.js',
      'spec/sdk/consumer/getConsumerAPISpecs.js',
      'spec/sdk/consumer/getConsumersAPISpecs.js',
      'spec/sdk/consumer/updateConsumerAPISpecs.js',
      'spec/sdk/consumer/deleteConsumerAPISpecs.js',
      'spec/sdk/consumer/getConsumerTokenAPISpecs.js',


      'spec/sdk/enrollment/addEnrollmentAPISpecs.js',
      'spec/sdk/enrollment/deleteEnrollmentAPISpecs.js',
      'spec/sdk/enrollment/getEnrollmentAPISpecs.js',
      'spec/sdk/enrollment/getEnrollmentsAPISpecs.js',
      'spec/sdk/enrollment/updateEnrollmentAPISpecs.js',

      'spec/sdk/verification/addVerificationAPISpecs.js',
      'spec/sdk/verification/updateVerificationAPISpecs.js',

      'spec/sdk/verification/deleteVerificationAPISpecs.js',
      'spec/sdk/verification/getVerificationAPISpecs.js',
      'spec/sdk/verification/getVerificationsAPISpecs.js',

      'spec/sdk/verification.js',

      'spec/sdk/call/addCallAPISpecs.js',
      'spec/sdk/call/deleteCallAPISpecs.js',
      'spec/sdk/call/getCallAPISpecs.js',
      'spec/sdk/call/getCallsAPISpecs.js',
      'spec/sdk/call/updateCallAPISpecs.js',

      'spec/sdk/analysis/getAnalysisAPISpecs.js',
      'spec/sdk/analysis/postFileAPISpecs.js',
      'spec/sdk/analysis/postUrlAPISpecs.js',

      {
        pattern: '../jasmine/resources/*.properties',
        watched: true,
        included: false,
        served: true
      },

    ],
    colors: true,
    browsers: ['Chrome_without_security'],

    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    },

    client: {
      captureConsole: true
    },
    reportSlowerThan: 1000,
    proxies: {
      '/resources/': 'http://localhost:7687/base/resources/'
    },

    reporters: ['progress', 'coverage', 'html'],
    // reporters: ['dots',''],
    preprocessors: {
      '../../src/**/*.js': ['coverage']
    },
    coverageReporter: {
      type: 'html',
      dir: 'reports/coverage'
    },
    htmlReporter: {
      outputFile: 'htmlreports/units.html'
    },


    junitReporter: {
      outputFile: 'reports/junit/junit.xml'
    },


    singleRun: false,
    // http://localhost:9877/base/resources/messages.properties
    "port": 7687
  });
};

// http://localhost:8080/sdk/app/test/jasmine/SpecRunner.html
