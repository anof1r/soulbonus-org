const walletState = {
    address: null,
    type: null,
    role: null,
    companyName: 'Company name',
    companyImage: "https://images.unsplash.com/photo-1602498456745-e9503b30470b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    bgColorCompany: '#6E1DAE',
    countSilverToMintGold: 8,
    GoldBonusDescription: null
}



export const walletReducer = (state = walletState, action) => {
    switch (action.type) {
        case 'SET_ADDRESS':
            return {
                ...state, address: action.payload.address, type: action.payload.type,
            };
        case 'CHECK_WALLET_CONNECTION':
            return {
                ...state, address: action.payload, type: 'metamask',
            };
        case 'CHANGE_COMPANY_SETTINGS':
            return {
                ...state, companyName: action.payload.localStateCompanyName, companyImage: action.payload.localStateImage,
            };
        case 'CHANGE_BONUS_DETAILS':
            return {
                ...state, bgColorCompany: action.payload.localColor, countSilverToMintGold: action.payload.sliderValue, GoldBonusDescription: action.payload.localBonusDescription,
            };
        case 'LOGOUT':
            return {
                ...state, address: null, type: null,
            };
        default:
            return state;
    }
}