import { PageRequest } from "../../../core/models";

/**
 * Model for Country list view
 */
export interface CountryListModel {
  countryId: number;
  name?: string;
}


/**
 * Request model for filtering Country list
 */
export interface CountrySearchRequest extends PageRequest {
}


export interface Country {
  countryId: number;
  name?: string;
}