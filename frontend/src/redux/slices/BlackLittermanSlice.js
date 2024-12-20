import { createSlice } from "@reduxjs/toolkit";
import {
  meanRiskOptiAction,
  meanRiskOptiOpcAction,
  portfolioAllocationAction,
  portfolioOptiAction,
} from "../actions/BlackLittermanActions";
const INIT = {
  portfolioOpti: {
    data: {
      weights: [],
      metrics: [],
      simulations: [],
      minVolatility: [],
      optimizedSharpe: [],
      optimizedVolatility: [],
      maxSharpeRatio: [],
    },
    loading: false,
    error: null,
  },
  portfolioAllocation: {
    data: {
      covariantCorrelation: [],
      marketPrior: [],
      omega: [],
      bl: [],
      rets: [],
      weights: [],
      portfolioPerf: [],
    },
    loading: false,
    error: null,
  },
  meanRiskOpti: {
    data: {
      weights: [],
      weightsBl: [],
      views: [],
      assetClasses: [],
      frontier: [],
      mu: [],
      cov: [],
      y: [],
      ws: [],
      p: [],
      q: [],
    },
    loading: false,
    error: null,
  },
  meanRisk: {
    OPCVM: {
      data: [],
      loading: false,
      error: null,
    },
    Actions: { data: [], loading: false, error: null },
  },
};

const initialState = INIT;

const BlackLittermanSlice = createSlice({
  name: "BlackLittermanSlice",
  initialState,
  reducers: {
    resetMeanRisk: (state) => {
      state.meanRisk = {
        OPCVM: {
          data: [],
          loading: false,
          error: null,
        },
        Actions: { data: [], loading: false, error: null },
      };
    },
  },
  extraReducers: (builder) => {
    // Portfolio Optimization
    builder.addCase(portfolioOptiAction.pending, ({ portfolioOpti }) => {
      portfolioOpti.loading = true;
    });
    builder.addCase(
      portfolioOptiAction.fulfilled,
      ({ portfolioOpti }, { payload }) => {
        portfolioOpti.loading = false;
        portfolioOpti.data.weights = payload.weights_df;
        portfolioOpti.data.metrics = payload.metrics_df;
        portfolioOpti.data.simulations = payload.simulations_df;
        portfolioOpti.data.maxSharpeRatio = payload.df_max_sharpe_ratio;
        portfolioOpti.data.minVolatility = payload.df_min_volatility;
        portfolioOpti.data.optimizedSharpe = payload.df_optimized_sharpe;
        portfolioOpti.data.optimizedVolatility =
          payload.df_optimized_volatility;
      }
    );
    builder.addCase(
      portfolioOptiAction.rejected,
      ({ portfolioOpti }, { payload }) => {
        portfolioOpti.loading = false;
        portfolioOpti.data = INIT.portfolioOpti.data;
        portfolioOpti.error = payload;
      }
    );

    // Portfolio Allocation
    builder.addCase(
      portfolioAllocationAction.pending,
      ({ portfolioAllocation }) => {
        portfolioAllocation.loading = true;
      }
    );
    builder.addCase(
      portfolioAllocationAction.fulfilled,
      ({ portfolioAllocation }, { payload }) => {
        portfolioAllocation.loading = false;
        portfolioAllocation.data.covariantCorrelation =
          payload.S_Covariant_Correlation;
        portfolioAllocation.data.marketPrior = payload.df_market_prior;
        portfolioAllocation.data.omega = payload.df_omega;
        portfolioAllocation.data.rets = payload.rets_df;
        portfolioAllocation.data.bl = payload.S_bl;
        portfolioAllocation.data.weights = payload.df_weights;
        portfolioAllocation.data.portfolioPerf =
          payload.df_portfolio_performance;
      }
    );
    builder.addCase(
      portfolioAllocationAction.rejected,
      ({ portfolioAllocation }, { payload }) => {
        portfolioAllocation.loading = false;
        portfolioAllocation.error = payload;
        portfolioAllocation.data = INIT.portfolioAllocation.data;
      }
    );

    // Mean Risk Optimization (Actions)
    builder.addCase(meanRiskOptiAction.pending, ({ meanRiskOpti }) => {
      meanRiskOpti.loading = true;
    });
    builder.addCase(
      meanRiskOptiAction.fulfilled,
      ({ meanRiskOpti }, { payload }) => {
        meanRiskOpti.loading = false;
        meanRiskOpti.data.y = payload.Y;
        meanRiskOpti.data.assetClasses = payload.asset_classes;
        meanRiskOpti.data.cov = payload.cov;
        meanRiskOpti.data.q = payload.df_Q;
        meanRiskOpti.data.p = payload.df_P;
        meanRiskOpti.data.frontier = payload.df_frontier;
        meanRiskOpti.data.weights = payload.df_weights;
        meanRiskOpti.data.weightsBl = payload.df_weights_bl;
        meanRiskOpti.data.views = payload.views;
        meanRiskOpti.data.mu = payload.mu;
        meanRiskOpti.data.ws = payload.w_s;
      }
    );
    builder.addCase(
      meanRiskOptiAction.rejected,
      ({ meanRiskOpti }, { payload }) => {
        meanRiskOpti.loading = false;
        meanRiskOpti.error = payload;
        meanRiskOpti.data = INIT.meanRiskOpti.data;
      }
    );

    // Mean Risk Optimization (OPCVM)
    builder.addCase(
      meanRiskOptiOpcAction.pending,
      ({ meanRisk: { OPCVM } }) => {
        OPCVM.loading = true;
      }
    );
    builder.addCase(
      meanRiskOptiOpcAction.fulfilled,
      ({ meanRisk: { OPCVM } }, { payload }) => {
        OPCVM.loading = false;
        OPCVM.data = payload;
      }
    );
    builder.addCase(
      meanRiskOptiOpcAction.rejected,
      ({ meanRisk: { OPCVM } }, { payload }) => {
        OPCVM.loading = false;
        OPCVM.error = payload;
        OPCVM.data = INIT.meanRisk.OPCVM.data;
      }
    );
  },
});
export const { resetMeanRisk } = BlackLittermanSlice.actions;
export default BlackLittermanSlice.reducer;
