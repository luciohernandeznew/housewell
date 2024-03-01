export type Person = {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
};  

export type Borrower = {
    borrower_id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    email: string;
};
  
export type USAddress = {
    line: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
    county: string;
};
  
export type SubjectProperty = {
    subject_property_id: string;
    address: USAddress;
    intended_usage_type: 'primary_residence' | 'secondary_home' | 'investment_property';
    property_type: 'single_family' | 'condominium' | 'multi_family' | 'manufactured_home';
    appraisal_ordered_date?: string;
    appraisal_assigned_date?: string;
    appraisal_due_date?: string;
    appraisal_scheduled_date?: string;
    appraisal_inspected_date?: string;
    actual_value_amount?: number;
    ready_for_appraisal?: boolean;
    appraisal_status?: string;
    hazard_insurance_status?: string;
    title_order_status?: string;
};

export type LoanStateMetadata = {
    los_status_description?: string;
    application_submitted?: boolean;
    preapproved?: boolean;
    is_cancelled?: boolean;
};
  

export type LoanType = 'conventional' | 'fha' | 'va' | 'jumbo' | 'construction';

export type LoanPurpose = 'purchase' | 'refinance' | 'construction' | 'renovate';

export type LoanApplicationModel = {
    loan_application_id: string;
    loan_reference_number: number;
    creation_date?: string; // Optional, must be a valid ISO 8601 timestamp if provided
    loan_status: 'Pre-Approved' | 'In Review' | 'Approved' | 'Withdrawn' | 'Suspended' | 'Denied';
    borrowers: Borrower[];
    non_borrowing_owners: Person[];
    property: SubjectProperty;
    loan_amount?: number;
    purchase_price?: number;
    max_preapproved_loan_amount?: number;
    max_preapproved_purchase_price?: number;
    max_preapproved_dpa_amount?: number;
    max_preapproved_mcc_amount?: number;
    down_payment_amount?: number;
    closing_date: string; // Must be a valid ISO 8601 timestamp
    loan_type: LoanType;
    loan_purpose?: LoanPurpose; // Optional
    loan_officer: Person;
    loan_processor: Person[];
    seller_real_estate_agent: Person[];
    buyer_real_estate_agent: Person[];
    escrow_agent: Person[];
    rate_lock_expires_date?: string; // Optional, must be a valid ISO 8601 timestamp if provided
    points?: number; // Optional
    fees?: number; // Optional
    status: LoanStateMetadata;
    is_archived: boolean;
};