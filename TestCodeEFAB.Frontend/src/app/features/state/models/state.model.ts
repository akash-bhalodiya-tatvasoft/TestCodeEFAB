import { SearchRequestModel } from "../../../core/models";

/**
 * Model for State list view
 */
export interface StateListModel {
    stateId: number;
    name: string;
    cName?: string;
    // Alias: CName (from Countries.Name)
  }
  
  
  /**
   * Request model for filtering State list
   */
  export interface StateSearchRequest extends SearchRequestModel {
    name?: string;
  }
  
  
  