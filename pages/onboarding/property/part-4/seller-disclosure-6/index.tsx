import { GetServerSidePropsContext } from "next";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { colors } from "../../../../../src/styles/colors";
import { makeAuthedApiRequest } from "../../../../../src/utils/api/apiHelper";
import StyledInputWithSuperText from "../../../../../src/components/boxes/StyledInputWithSupertext";
import ParagraphStyledInput from "../../../../../src/components/boxes/ParagraphStyledInput";
import OnboardingScreenFrame from "../../../../../src/components/stuff/OnboardingScreenFrame";
import { useRouter } from "next/router";
import { useDevice } from "../../../../../src/contexts/DeviceContext";
import {
    H3,
    H5,
    MintParagraph,
} from "../../../../../src/components/Typography/Typography";
import StatusMessage from "../../../../../src/components/stuff/StatusMessage";
import MultipleChoiceParent from "../../../../../src/components/stuff/MultipleChoiceParent";
import StyledYearMonthMultiInput from "../../../../../src/components/boxes/StyledYearMonthMultiInput";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export const StyledInput = styled.input<{ isSmall?: boolean }>`
    height: 64px;
    font-size: ${(props) => (props.isSmall ? "16px" : "24px")};
    line-height: ${(props) => (props.isSmall ? "18px" : "24px")};
    font-family: Mint Grotesk Medium;
    border: 1px solid ${colors.gray300};
    border-radius: 8px;
    padding: 0 16px;

    &:focus {
        outline: none;
        border: 2px solid ${colors.darkgreen1000};
        padding: 0 16px;
        box-sizing: border-box;
        border-radius: 8px;
    }

    ::placeholder {
        color: ${colors.gray700};
    }
    &:disabled {
        background-color: ${colors.gray100};
        color: ${colors.gray700};
    }
`;

const SellerDisclosure6 = () => {
    const router = useRouter();
    const currentDate = dayjs();
    const handleNextSubmit = async () => {
        router.push("/onboarding/property/part-4/seller-disclosure-7");
    };
    const [selectedYearsOldRoof, setSelectedYearsOldRoof] = useState<any>(null);
    const [selectedIndicateWater, setSelectedIndicateWater] =
        useState<any>(null);
    const [selectedSewage, setSelectedSewage] = useState<any>(null);
    const [selectedTank, setSelectedTank] = useState<any>(null);
    const [selectedLeak, setSelectedLeak] = useState<any>(null);
    const [selecedPlumbing, setSelectedPlumbing] = useState<any>(null);
    const [selecedFixture, setSelectedFixture] = useState<any>(null);
    const disclosureEnumOptions = [{ text: "Yes" }, { text: "No" }];
    const tankServiceDate = currentDate.format("YYYY-MM-DD");
    const testServiceDate = currentDate.format("YYYY-MM-DD");
    const lastServiceDate = currentDate.format("YYYY-MM-DD");
    const [selectedWaterSource, setSelectedWaterSource] = useState(-1);
    const [dateService, setDateService] = useState(lastServiceDate);
    const [dateTesting, setDateTesting] = useState(testServiceDate);
    const [dateTank, setDateTank] = useState(tankServiceDate);
    const [localEnvironment, setLocalEnvironment] = useState<any>(null);
    return (
        <OnboardingScreenFrame nextOnClick={handleNextSubmit}>
            <H5 style={{ marginBottom: "24px" }}>
                Seller&apos;s Disclosure: SEWER/PLUMBING RELATED ITEMS
            </H5>{" "}
            <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>
                    Fill out this information about your home to the best of
                    your ability. It&apos;s ok to not know all the details or
                    exact dates, but this helps you fulfill your legal duty to
                    notify buyers of adverse conditions of the property. Reach
                    out to a housewell advisor if you have questions.
                </MintParagraph>
            </StatusMessage>
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (a) Approximate age of water heaters
            </MintParagraph>
            <StyledInput
                type="text"
                min={0}
                value={selectedYearsOldRoof}
                onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                    setSelectedYearsOldRoof(numericValue);
                }}
                required
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (b) What is the drinking water source
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "24px 0 36px 0" }}
                choices={[
                    { text: "public" },
                    { text: "private" },
                    { text: "well" },
                ]}
                selectedIndex={selectedWaterSource}
                onSelection={(index) => setSelectedWaterSource(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (c) If the drinking water is from a well, give the date of last
                service:
            </MintParagraph>
            <StyledInput
                type="date"
                min={currentDate.format("YYYY-MM-DD")}
                value={dateService}
                onChange={(e) => setDateService(e.target.value)}
                required
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (d) If the drinking water is from a well, has there ever been a
                test the results of which indicate that the water is not safe to
                drink?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedIndicateWater}
                onSelection={(index) => setSelectedIndicateWater(index)}
            />
            {selectedIndicateWater == 0 && (
                <>
                    <MintParagraph
                        size="24"
                        weight="regular"
                        style={{ marginTop: "24px", marginBottom: "24px" }}
                    >
                        when is the date of testing?
                    </MintParagraph>
                    <StyledInput
                        type="date"
                        min={currentDate.format("YYYY-MM-DD")}
                        value={dateTesting}
                        onChange={(e) => setDateTesting(e.target.value)}
                        required
                    />
                </>
            )}
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (e) What is the sewer system:
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "24px 0 36px 0" }}
                choices={[
                    { text: "public" },
                    { text: "private" },
                    { text: "well" },
                ]}
                selectedIndex={selectedWaterSource}
                onSelection={(index) => setSelectedWaterSource(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (f) If the Property is served by a septic system, how many
                bedrooms was the septic system approved for by local government
                authorities?
            </MintParagraph>
            <StyledInput
                type="text"
                min={0}
                value={localEnvironment}
                onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                    setLocalEnvironment(numericValue);
                }}
                required
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (g) Is the main dwelling served by a sewage pump?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedSewage}
                onSelection={(index) => setSelectedSewage(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (h) Has any septic tank or cesspool on Property ever been
                professionally serviced?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedTank}
                onSelection={(index) => setSelectedTank(index)}
            />
            {selectedTank == 0 && (
                <>
                    <MintParagraph
                        size="24"
                        weight="regular"
                        style={{ marginTop: "24px", marginBottom: "24px" }}
                    >
                        When is the date of last service?
                    </MintParagraph>
                    <StyledInput
                        type="date"
                        min={currentDate.format("YYYY-MM-DD")}
                        value={dateTank}
                        onChange={(e) => setDateTank(e.target.value)}
                        required
                    />
                </>
            )}
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (i) Are there any leaks, backups, or other similar problems with
                any portion of the plumbing, water, or sewage systems or damage
                therefrom?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedLeak}
                onSelection={(index) => setSelectedLeak(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (j) Is there presently any polybutylene plumbing, other than the
                primary service line?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selecedPlumbing}
                onSelection={(index) => setSelectedPlumbing(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (k) Has there ever been any damage from a frozen water line,
                spigot, or fixture?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selecedFixture}
                onSelection={(index) => setSelectedFixture(index)}
            />
        </OnboardingScreenFrame>
    );
};

export default SellerDisclosure6;
