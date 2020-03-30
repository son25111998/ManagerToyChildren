import { TokenInfo } from './tokenInfor';
export class UserInfo {
    userName: string;
    loweredUsername: string;
    mobileAlias: string;
    isAnonymous: number;
    userType: number;
    accessTokenInfo: TokenInfo;
    rights: any;
}