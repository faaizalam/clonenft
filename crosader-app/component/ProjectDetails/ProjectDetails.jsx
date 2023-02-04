import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../UI/Icons/Icon";
import Attribute from "./Attribute/Attribute";
import AttributeLink from "./AttributeLink/AttributeLink";
import AttributesBox from "./AttributesBox/AttributesBox";
import { useSelector } from "react-redux";
import classes from "./ProjectDetails.module.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import { TwitterShareButton } from "react-share";
import parse from "html-react-parser";

const ProjectDetails = () => {
  const { theme } = useSelector((state) => state.theme);
  const { projects } = useSelector((state) => state.project);
  const params = useParams();
  const navigate = useNavigate();
  const heading = params.projectName.replace(/-/g, " ");
  const [selectedProject, setSelectedProject] = useState({
    projectType: [],
    mintStatus: {},
    status: {},
  });

  const goBack = () => {
    navigate(-1);
  };

  let styleClasses = classes.Project;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  const getProjectMintDate = (date) => {
    if (date === undefined) {
      return "N/A";
    }
    return moment.unix(date).format("ddd, MMM Do y, hh:mm A");
  };

  const getProjectMintDateUTC = (date) => {
    if (date === undefined) {
      return "N/A";
    }
    return moment.unix(date).utc().format("dd, MMM Do y, hh:mm A");
  };

  const structureNumber = (number) => {
    if (!number) return;
    return Math.floor(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let mintStatusHeader = null;

  if (
    selectedProject &&
    selectedProject.projectType &&
    selectedProject.projectType.some(({ name }) =>
      name.toLowerCase().includes("nfts")
    )
  ) {
    mintStatusHeader = (
      <small className={classes.HeaderStatus}>
        {/* <span>
              <Icon name="status" />
            </span> */}
        {selectedProject.mintStatus
          ? `Mint: ${selectedProject.mintStatus.name}`
          : ""}
      </small>
    );
  }

  useEffect(() => {
    if (projects) {
      const foundProject = projects.find((project) => {
        return heading.toLocaleLowerCase() === project.name.toLocaleLowerCase();
      });
      if (foundProject === undefined) {
        return navigate("/home");
      }

      setSelectedProject(foundProject);
    }
  }, [projects, heading, navigate]);

  const {
    mintStatus,
    mintQuantity,
    quantityDetails,
    publicMintPrice,
    ebPrice,
    whitelistMintPrice,
    whitelistDetails,
    whitelistMintDate,
    mintCloseDate,
    publicMintDate,
    rarity,
    utility,
    utilityDetails,
    staking,
    stakingDetails,
    nftContract,
    tokenomics,
    token,
    tokenContract,
    dao,
    daoDetails,
    nftContractDetails,
  } = selectedProject || {};

  const isTechnicalDetailsExist =
    rarity ||
    utility ||
    utilityDetails ||
    staking ||
    stakingDetails ||
    nftContract ||
    tokenomics ||
    token ||
    tokenContract ||
    dao ||
    daoDetails;

  const isMintDetailsExist =
    mintStatus ||
    mintQuantity ||
    quantityDetails ||
    publicMintPrice ||
    ebPrice ||
    publicMintDate ||
    whitelistMintPrice ||
    whitelistDetails ||
    whitelistMintDate ||
    mintCloseDate;

  const isStatsExist =
    nftContractDetails &&
    Object.keys(nftContractDetails).some((key) => !!nftContractDetails[key]);
  return (
    <div className={styleClasses}>
      <button className={classes.BackButton} onClick={goBack}>
        <Icon name="chevron" />
      </button>
      <div className={classes.ProjectHeader}>
        <div className={classes.HeaderDetails}>
          <h5>{selectedProject.name}</h5>
          {mintStatusHeader}
        </div>
        <TwitterShareButton
          title={`Check out ${selectedProject.name} on CroSader!

`}
          hashtags={["crofam", "cro", "CronosNFT", "CroSader"]}
          url={window.location.href}
          className={classes.Bookmark}
        >
          <Icon name="twitter" />
        </TwitterShareButton>
      </div>
      <div className={classes.ProjectImage}>
        <img
          src={`${process.env.REACT_APP_BASE_URL}/projects/${selectedProject._id}/image`}
          alt={heading}
        />
      </div>
      <p className={classes.ProjectDetails}>
        {selectedProject.description && parse(selectedProject.description)}
      </p>
      {isMintDetailsExist && (
        <AttributesBox heading="Mint Details">
          {selectedProject.mintStatus && (
            <Attribute
              name="Mint Status"
              value={selectedProject.mintStatus.name}
            />
          )}
          {selectedProject.mintQuantity && (
            <Attribute name="Quantity" value={selectedProject.mintQuantity} />
          )}
          {selectedProject.quantityDetails && (
            <Attribute
              name="Quantity Details"
              value={selectedProject.quantityDetails}
            />
          )}
          {selectedProject.publicMintPrice && (
            <Attribute
              name="Public Mint $CRO"
              value={selectedProject.publicMintPrice}
            />
          )}
          {selectedProject.ebPrice && (
            <Attribute
              name="Ebisu’s Bay $CRO"
              value={selectedProject.ebPrice}
            />
          )}
          {!!selectedProject.whitelistMintPrice && (
            <Attribute
              name="Whitelist Mint $CRO"
              value={selectedProject.whitelistMintPrice}
            />
          )}
          {!!selectedProject.whitelistDetails && (
            <Attribute
              name="Whitelist Details"
              value={selectedProject.whitelistDetails}
            />
          )}
          {!!selectedProject.whitelistMintDate && (
            <Attribute
              name="WL Mint Date (Local)"
              value={getProjectMintDate(selectedProject.whitelistMintDate)}
            />
          )}
          {!!selectedProject.whitelistMintDate && (
            <Attribute
              name="WL Mint Date (UTC)"
              value={getProjectMintDateUTC(selectedProject.whitelistMintDate)}
            />
          )}
          {!!selectedProject.publicMintDate && (
            <Attribute
              name="Mint Date (Local)"
              value={getProjectMintDate(selectedProject.publicMintDate)}
            />
          )}
          {!!selectedProject.publicMintDate && (
            <Attribute
              name="Mint Date (UTC)"
              value={getProjectMintDateUTC(selectedProject.publicMintDate)}
            />
          )}
          {!!selectedProject.mintCloseDate && (
            <Attribute
              name="Mint Close Date (Local)"
              value={getProjectMintDate(selectedProject.mintCloseDate)}
            />
          )}
          {!!selectedProject.mintCloseDate && (
            <Attribute
              name="Mint Close Date (UTC)"
              value={getProjectMintDateUTC(selectedProject.mintCloseDate)}
            />
          )}
        </AttributesBox>
      )}
      {isTechnicalDetailsExist && (
        <AttributesBox heading="Technicals">
          {selectedProject.rarity && (
            <Attribute name="Rarity" value={selectedProject.rarity} />
          )}
          {selectedProject.utility && (
            <Attribute name="Utility" value={selectedProject.utility} />
          )}
          {selectedProject.utilityDetails && (
            <Attribute
              name="Utility Details"
              value={selectedProject.utilityDetails}
            />
          )}
          {selectedProject.staking && (
            <Attribute name="Staking" value={selectedProject.staking} />
          )}
          {selectedProject.stakingDetails && (
            <Attribute
              name="Staking Details"
              value={selectedProject.stakingDetails}
            />
          )}
          {selectedProject.nftContract && (
            <AttributeLink
              contractLink
              name="NFT Contract Address"
              link={selectedProject.nftContract}
            />
          )}
          {selectedProject.tokenomics && (
            <Attribute name="Tokenomics" value={selectedProject.tokenomics} />
          )}
          {selectedProject.token && (
            <Attribute name="Token" value={selectedProject.token} />
          )}
          {selectedProject.tokenContract && (
            <AttributeLink
              contractInfo
              name="Token Contract"
              link={selectedProject.tokenContract}
            />
          )}
          {selectedProject.dao && (
            <Attribute name="DAO" value={selectedProject.dao} />
          )}
          {selectedProject.daoDetails && (
            <Attribute name="DAO Details" value={selectedProject.daoDetails} />
          )}
        </AttributesBox>
      )}
      {isStatsExist && (
        <AttributesBox
          heading="Ebisu's Bay Live Stats"
          subText=" (Updates every 5 minutes)"
        >
          {selectedProject?.nftContractDetails?.floorPrice && (
            <Attribute
              name="Floor Price"
              value={`${structureNumber(
                selectedProject.nftContractDetails.floorPrice
              )} CRO`}
            />
          )}
          {selectedProject?.nftContractDetails?.totalVolume && (
            <Attribute
              name="Total Volume"
              value={`${structureNumber(
                selectedProject.nftContractDetails.totalVolume
              )} CRO`}
            />
          )}
          {selectedProject?.nftContractDetails?.numberActive && (
            <Attribute
              name="Active Listings"
              value={structureNumber(
                selectedProject.nftContractDetails.numberActive
              )}
            />
          )}
          {selectedProject?.nftContractDetails?.numberOfSales && (
            <Attribute
              name="Number of sales"
              value={structureNumber(
                selectedProject.nftContractDetails.numberOfSales
              )}
            />
          )}
          {!!selectedProject?.nftContractDetails?.totalRoyalties && (
            <Attribute
              name="Total Royalties"
              value={`${structureNumber(
                selectedProject.nftContractDetails.totalRoyalties
              )} CRO`}
            />
          )}
          {selectedProject?.nftContractDetails?.averageSalePrice && (
            <Attribute
              name="Average Sale Price"
              value={`${structureNumber(
                selectedProject.nftContractDetails.averageSalePrice
              )} CRO`}
            />
          )}
        </AttributesBox>
      )}
      <AttributesBox heading="Socials">
        {selectedProject.websiteLink && (
          <AttributeLink name="Website" link={selectedProject.websiteLink} />
        )}
        {selectedProject.twitterLink && (
          <AttributeLink name="Twitter" link={selectedProject.twitterLink} />
        )}
        {selectedProject.discordLink && (
          <AttributeLink name="Discord" link={selectedProject.discordLink} />
        )}
        {selectedProject.telegramLink && (
          <AttributeLink name="Telegram" link={selectedProject.telegramLink} />
        )}
        {selectedProject.lootpadLink && (
          <AttributeLink name="Lootpad" link={selectedProject.lootpadLink} />
        )}
        {selectedProject.whitePaperLink && (
          <AttributeLink
            name="Whitepaper"
            link={selectedProject.whitePaperLink}
          />
        )}
        {selectedProject.tiktokLink && (
          <AttributeLink name="TikTok" link={selectedProject.tiktokLink} />
        )}
        {selectedProject.instagramLink && (
          <AttributeLink
            name="Instagram"
            link={selectedProject.instagramLink}
          />
        )}
        {selectedProject.ebLink && (
          <AttributeLink name="Ebisu's Bay" link={selectedProject.ebLink} />
        )}
        {selectedProject.agoraLink && (
          <AttributeLink name="Agora" link={selectedProject.agoraLink} />
        )}
        {selectedProject.openSea && (
          <AttributeLink name="OpenSea" link={selectedProject.openSea} />
        )}
        {selectedProject.projectEmail && (
          <AttributeLink
            name="Project Email"
            link={`mailto:${selectedProject.projectEmail}`}
          />
        )}
      </AttributesBox>
      <button className={classes.BackButton} onClick={goBack}>
        <Icon name="chevron" /> Back
      </button>
    </div>
  );
};

export default ProjectDetails;
