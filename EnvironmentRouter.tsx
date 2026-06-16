import React from 'react';
import { EnvironmentType } from '../../data/cases';
import GmailEnvironment from './GmailEnvironment';
import WhatsAppEnvironment from './WhatsAppEnvironment';
import SMSCourierEnvironment from './SMSCourierEnvironment';
import UPIQREnvironment from './UPIQREnvironment';
import JobPortalEnvironment from './JobPortalEnvironment';
import InvestmentScamEnvironment from './InvestmentScamEnvironment';
import InstagramGiveawayEnvironment from './InstagramGiveawayEnvironment';
import FakeCustomerCareEnvironment from './FakeCustomerCareEnvironment';
import ElectricitySMSEnvironment from './ElectricitySMSEnvironment';
import DeepfakeCallEnvironment from './DeepfakeCallEnvironment';
import MarketplaceEnvironment from './MarketplaceEnvironment';
import UPICollectEnvironment from './UPICollectEnvironment';
import ScholarshipPortalEnvironment from './ScholarshipPortalEnvironment';
import AadhaarPortalEnvironment from './AadhaarPortalEnvironment';
import SocialRecoveryEnvironment from './SocialRecoveryEnvironment';

interface EnvironmentRouterProps {
  environmentType: EnvironmentType;
}

export default function EnvironmentRouter({ environmentType }: EnvironmentRouterProps) {
  switch (environmentType) {
    case 'gmail': return <GmailEnvironment />;
    case 'whatsapp': return <WhatsAppEnvironment />;
    case 'sms-courier': return <SMSCourierEnvironment />;
    case 'upi-qr': return <UPIQREnvironment />;
    case 'job-portal': return <JobPortalEnvironment />;
    case 'investment-scam': return <InvestmentScamEnvironment />;
    case 'instagram-giveaway': return <InstagramGiveawayEnvironment />;
    case 'fake-customer-care': return <FakeCustomerCareEnvironment />;
    case 'electricity-sms': return <ElectricitySMSEnvironment />;
    case 'deepfake-call': return <DeepfakeCallEnvironment />;
    case 'marketplace': return <MarketplaceEnvironment />;
    case 'upi-collect': return <UPICollectEnvironment />;
    case 'scholarship-portal': return <ScholarshipPortalEnvironment />;
    case 'aadhaar-portal': return <AadhaarPortalEnvironment />;
    case 'social-recovery': return <SocialRecoveryEnvironment />;
    default: return <div className="flex items-center justify-center h-full text-slate-400">Environment not found</div>;
  }
}
