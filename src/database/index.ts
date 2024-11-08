import { Op, Sequelize, Transaction } from 'sequelize'
import * as models from './models'
import {
    Users,
} from './models'

const sequelize = new Sequelize(process.env.DATABASE_CONNECTION_URI as string, {
    logging: true,
    dialect: "mysql"
})

function initModels() {
    models.initUsers(sequelize);
    // models.initApp(sequelize);
    // models.initStore(sequelize);
    // models.initCustomer(sequelize);
    // models.initReview(sequelize);
    // models.initSocialLogin(sequelize);
    // models.initReviewRequest(sequelize);
    // models.initSessionRequest(sequelize);
    // models.initSupport(sequelize);
    // models.initSocialLink(sequelize);
    // models.initCampaign(sequelize);
    // models.initPlan(sequelize);
    // models.initCampaignRun(sequelize);
    // models.initPageViews(sequelize);
}

function associateModels() {
    models.associateUsers();
    // models.associateApp();
    // models.associateStore();
    // models.associateCustomer();
    // models.associateReview();
    // models.associateSocialLogin();
    // models.associateReviewRequest();
    // models.associateSessionRequest();
    // models.associateSupport();
    // models.associateSocialLink();
    // models.associateCampaign();
    // models.associatePlan();
    // models.associateCampaignRun();
    // models.assocaitePageViews();
}

initModels()
associateModels()

export { sequelize, Sequelize, Transaction, Op }
export {
    Users,
    // App,
    // Store,
    // Customer,
    // Review,
    // SocialLogin,
    // ReviewRequest,
    // SessionRequest,
    // Support,
    // SocialLink,
    // Campaign,
    // Plan,
    // CampaignRun,
    // PageViews
}