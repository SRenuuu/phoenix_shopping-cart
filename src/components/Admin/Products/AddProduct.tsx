import React, {FC, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import customStyles from "../../../assets/styles/partials/customStyles";
import Select from "react-select";
import Preview from "./Preview";
import vegiPic from "../../../assets/images/vegi.webp";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {ProductActionCreator, State} from "../../../state";

type AddProductProps = {
  cancel: () => void
};

const AddProduct: FC<AddProductProps> = (props) => {
  const {cancel} = props;

  const dispatch = useDispatch();
  const {AddItem} = bindActionCreators(ProductActionCreator, dispatch);

  const categoryList = [
    {value: 'Grocery', label: 'Grocery'},
    {value: 'Pharmacy', label: 'Pharmacy'},
    {value: 'Food', label: 'Food'},
    {value: 'Electronic', label: 'Electronic'}
  ];

  const [name, setName] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>(vegiPic);
  const [crossPrice, setCrossPrice] = useState<string>("");
  const [sellPrice, setSellPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleOnClickCreateBtn = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if ((name == "") || (crossPrice == "") || (sellPrice == ""))
      return;

    AddItem({
      picSrc: imgSrc,
      name: name,
      crossedPrice: crossPrice,
      price: sellPrice,
      category: category
    });

    cancel();
  }

  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const handleOnClickPreview = () => {
    setPreviewVisible(!previewVisible);
  }

  const handleOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const handleOnChangeImgSrc = (event: React.ChangeEvent<HTMLInputElement>) => setImgSrc(event.target.value);
  const handleOnChangeCrossPrice = (event: React.ChangeEvent<HTMLInputElement>) => setCrossPrice(event.target.value);
  const handleOnChangeSellPrice = (event: React.ChangeEvent<HTMLInputElement>) => setSellPrice(event.target.value);
  const handleOnChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => setCategory(event.target.value);

  const [validated, setValidated] = useState<boolean>(false);

  return (
    <Col className="add-product px-0" xs={12}>
      <Row className="mx-0">
        <Col className="form px-0" lg={previewVisible ? 8 : 12} md={12}>
          <Row className="mx-0">
            <Col className="px-0 pb-4 form-title" xs={12}>
              Add Product
            </Col>
            <Col className="px-0 form-body text-start" xs={12}>
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={(event: React.FormEvent) => handleOnClickCreateBtn(event)}
                >
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label className="label" column="sm" lg={2} sm={12} xs={12}>
                      Name
                    </Form.Label>
                    <label className="label-small">Name</label>
                    <Col lg={10} sm={12} xs={12}>
                      <Form.Control
                        required
                        className="input-field"
                        size="sm"
                        type="text"
                        value={name}
                        onChange={handleOnChangeName}
                      />
                      <Form.Control.Feedback>
                        Looks good!
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please provide a Name.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label className="label" column="sm" lg={2} sm={12} xs={12}>
                      Cross Price
                    </Form.Label>
                    <label className="label-small">Cross Price</label>
                    <Col lg={10} sm={12} xs={12}>
                      <Form.Control
                        required
                        className="input-field"
                        size="sm"
                        type="text"
                        onChange={handleOnChangeCrossPrice}
                      />
                      <Form.Control.Feedback>
                        Looks good!
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please provide a crossed price.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label className="label" column="sm" lg={2} sm={12} xs={12}>
                      Sell Price
                    </Form.Label>
                    <label className="label-small">Sell Price</label>
                    <Col lg={10} sm={12} xs={12}>
                      <Form.Control
                        required
                        className="input-field"
                        size="sm"
                        type="text"
                        onChange={handleOnChangeSellPrice}
                      />
                      <Form.Control.Feedback>
                        Looks good!
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please provide a Price.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label className="label" column="sm" lg={2} sm={12} xs={12}>
                      Category
                    </Form.Label>
                    <label className="label-small">Category</label>
                    <Col lg={10} sm={12} xs={12}>
                      <Select
                        classNamePrefix="select no-border"
                        defaultValue={categoryList[0]}
                        isSearchable={true}
                        name="category"
                        styles={customStyles}
                        options={categoryList}
                        onSelect={(event: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChangeCategory(event)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label className="label" column="sm" lg={2} sm={12} xs={12}>
                      Image
                    </Form.Label>
                    <label className="label-small">Image</label>
                    <Col lg={10} sm={12} xs={12}>
                      <Form.Control
                        size="sm"
                        type="file"
                        name="file"
                        className="input-field"
                        onChange={handleOnChangeImgSrc}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Col lg={{offset: 2}}>
                      <Form.Check
                        className="input-field"
                        name="terms"
                        label="Preview the item"
                        onChange={() => handleOnClickPreview()}
                      />
                    </Col>
                  </Form.Group>
                  {previewVisible &&
                    <Form.Group as={Row} className="preview-small mb-3">
                        <Col className="px-0" lg={{offset: 2}}>
                            <Preview name={name} crossPrice={crossPrice} sellPrice={sellPrice} />
                        </Col>
                    </Form.Group>}
                  <Form.Group as={Row} className="mb-3">
                    <Col lg={{offset: 2}}>
                      <Button
                        variant="success"
                        size="sm"
                        type="submit"
                        // onClick={() => handleOnClickCreateBtn()}
                      >
                        Create
                      </Button>
                      <Button
                        variant="secondary"
                        className="ms-2"
                        size="sm"
                        onClick={() => cancel()}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
            </Col>
          </Row>
        </Col>
        {previewVisible &&
          <Col className="preview px-0 ps-xl-5 ps-lg-4 mt-3 pt-4">
              <Preview name={name} crossPrice={crossPrice} sellPrice={sellPrice} />
          </Col>
        }
      </Row>
    </Col>
  );
}

export default AddProduct;